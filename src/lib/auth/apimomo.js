import crypto from 'crypto';
import axios from 'axios';

class MoMoAPI {
  constructor() {
    this.momoConfig = {
      accessKey: process.env.MOMO_ACCESS_KEY,
      secretKey: process.env.MOMO_SECRET_KEY,
      partnerCode: process.env.MOMO_PARTNER_CODE,
      redirectUrl: process.env.MOMO_REDIRECT_URL,
      ipnUrl: process.env.MOMO_IPN_URL,
      requestType: process.env.MOMO_REQUEST_TYPE || 'captureWallet',
      extraData: process.env.MOMO_EXTRA_DATA || '',
      orderGroupId: process.env.MOMO_ORDER_GROUP_ID || '',
      autoCapture: process.env.MOMO_AUTO_CAPTURE === 'true',
      lang: process.env.MOMO_LANG || 'vi',
      endpoint: 'https://test-payment.momo.vn/v2/gateway/api'
    };
  }

  async createMoMoPayment(amount, orderInfo = null) {
    try {
      const orderId = this.momoConfig.partnerCode + Date.now();
      const requestId = orderId;
      const finalOrderInfo = orderInfo || `SWVN - ${orderId}`;

      const rawSignature = `accessKey=${this.momoConfig.accessKey}&amount=${amount}&extraData=${this.momoConfig.extraData}&ipnUrl=${this.momoConfig.ipnUrl}&orderId=${orderId}&orderInfo=${finalOrderInfo}&partnerCode=${this.momoConfig.partnerCode}&redirectUrl=${this.momoConfig.redirectUrl}&requestId=${requestId}&requestType=${this.momoConfig.requestType}`;

      const signature = crypto
        .createHmac('sha256', this.momoConfig.secretKey)
        .update(rawSignature)
        .digest('hex');

      const requestBody = {
        partnerCode: this.momoConfig.partnerCode,
        partnerName: 'KuromiShop',
        storeId: 'MomoTestStore',
        requestId,
        amount,
        orderId,
        orderInfo: finalOrderInfo,
        redirectUrl: this.momoConfig.redirectUrl,
        ipnUrl: this.momoConfig.ipnUrl,
        lang: this.momoConfig.lang,
        requestType: this.momoConfig.requestType,
        autoCapture: this.momoConfig.autoCapture,
        extraData: this.momoConfig.extraData,
        orderGroupId: this.momoConfig.orderGroupId,
        signature,
      };

      const { data } = await axios.post(
        `${this.momoConfig.endpoint}/create`,
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      return {
        success: true,
        data,
        orderId,
        requestId
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        details: error.response?.data || null
      };
    }
  }

  async checkMoMoPayment(orderId) {
    try {
      const rawSignature = `accessKey=${this.momoConfig.accessKey}&orderId=${orderId}&partnerCode=${this.momoConfig.partnerCode}&requestId=${orderId}`;

      const signature = crypto
        .createHmac('sha256', this.momoConfig.secretKey)
        .update(rawSignature)
        .digest('hex');

      const requestBody = {
        partnerCode: this.momoConfig.partnerCode,
        requestId: orderId,
        orderId,
        signature,
        lang: this.momoConfig.lang,
      };

      const { data } = await axios.post(
        `${this.momoConfig.endpoint}/query`,
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        details: error.response?.data || null
      };
    }
  }

  verifyMoMoCallback(callbackData) {
    try {
      const {
        accessKey,
        amount,
        extraData,
        message,
        orderId,
        orderInfo,
        orderType,
        partnerCode,
        payType,
        requestId,
        responseTime,
        resultCode,
        signature
      } = callbackData;

      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}`;

      const expectedSignature = crypto
        .createHmac('sha256', this.momoConfig.secretKey)
        .update(rawSignature)
        .digest('hex');

      return signature === expectedSignature;
    } catch (error) {
      return false;
    }
  }

  getConfig() {
    return {
      partnerCode: this.momoConfig.partnerCode,
      redirectUrl: this.momoConfig.redirectUrl,
      lang: this.momoConfig.lang
    };
  }
}

const momoAPI = new MoMoAPI();

export default momoAPI;
export const {
  createMoMoPayment,
  checkMoMoPayment,
  verifyMoMoCallback,
  getConfig
} = momoAPI; 