import crypto from 'crypto';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';

/**
 * Payment API Library for MoMo and ZaloPay
 * Consolidates payment functionality for both payment gateways
 */

class PaymentAPI {
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

    this.zaloConfig = {
      appId: process.env.ZALO_APP_ID,
      key1: process.env.ZALO_KEY1,
      endpoint: process.env.ZALO_ENDPOINT || 'https://sb-openapi.zalopay.vn/v2/create',
      redirectUrl: process.env.ZALO_REDIRECT_URL,
      callbackUrl: process.env.ZALO_CALLBACK_URL
    };
  }

  /**
   * Create MoMo payment
   * @param {number} amount - Payment amount
   * @param {string} orderInfo - Order information
   * @returns {Promise<Object>} Payment response
   */
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

  /**
   * Check MoMo payment status
   * @param {string} orderId - Order ID to check
   * @returns {Promise<Object>} Payment status response
   */
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

  /**
   * Create ZaloPay payment
   * @param {number} amount - Payment amount
   * @param {string} description - Payment description
   * @param {string} appUser - User identifier
   * @returns {Promise<Object>} Payment response
   */
  async createZaloPayment(amount, description = null, appUser = 'user123') {
    try {
      const embed_data = {
        redirecturl: this.zaloConfig.redirectUrl,
      };

      const items = [];
      const transID = Math.floor(Math.random() * 1000000);
      const appTransId = `${moment().format('YYMMDD')}_${transID}`;

      const order = {
        app_id: this.zaloConfig.appId,
        app_trans_id: appTransId,
        app_user: appUser,
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount,
        callback_url: this.zaloConfig.callbackUrl,
        description: description || `Kuromi - Payment for the order #${transID}`,
        bank_code: '',
      };

      const data =
        order.app_id +
        '|' +
        order.app_trans_id +
        '|' +
        order.app_user +
        '|' +
        order.amount +
        '|' +
        order.app_time +
        '|' +
        order.embed_data +
        '|' +
        order.item;

      order.mac = CryptoJS.HmacSHA256(data, this.zaloConfig.key1).toString();

      const result = await axios.post(this.zaloConfig.endpoint, null, {
        params: order,
      });

      return {
        success: true,
        data: result.data,
        appTransId
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        details: error.response?.data || null
      };
    }
  }

  /**
   * Check ZaloPay payment status
   * @param {string} appTransId - App transaction ID to check
   * @returns {Promise<Object>} Payment status response
   */
  async checkZaloPayment(appTransId) {
    try {
      const data = `${this.zaloConfig.appId}|${appTransId}|${this.zaloConfig.key1}`;
      const mac = CryptoJS.HmacSHA256(data, this.zaloConfig.key1).toString();

      const postData = {
        app_id: this.zaloConfig.appId,
        app_trans_id: appTransId,
        mac,
      };

      const response = await axios.post(
        'https://sb-openapi.zalopay.vn/v2/query',
        qs.stringify(postData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        details: error.response?.data || null
      };
    }
  }

  /**
   * Verify MoMo callback signature
   * @param {Object} callbackData - Callback data from MoMo
   * @returns {boolean} Signature validity
   */
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

  /**
   * Verify ZaloPay callback signature
   * @param {Object} callbackData - Callback data from ZaloPay
   * @returns {boolean} Signature validity
   */
  verifyZaloCallback(callbackData) {
    try {
      const { app_id, app_trans_id, app_time, amount, app_user, zp_trans_id, server_time, channel, merchant_user_id, user_fee_amount, discount_amount, mac } = callbackData;

      const data = `${app_id}|${app_trans_id}|${app_time}|${amount}|${app_user}|${zp_trans_id}|${server_time}|${channel}|${merchant_user_id}|${user_fee_amount}|${discount_amount}`;
      const expectedMac = CryptoJS.HmacSHA256(data, this.zaloConfig.key1).toString();

      return mac === expectedMac;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get payment configuration
   * @returns {Object} Payment configurations
   */
  getConfig() {
    return {
      momo: {
        partnerCode: this.momoConfig.partnerCode,
        redirectUrl: this.momoConfig.redirectUrl,
        lang: this.momoConfig.lang
      },
      zalo: {
        appId: this.zaloConfig.appId,
        redirectUrl: this.zaloConfig.redirectUrl
      }
    };
  }
}

// Create singleton instance
const paymentAPI = new PaymentAPI();

export default paymentAPI;

// Export individual methods for convenience
export const {
  createMoMoPayment,
  checkMoMoPayment,
  createZaloPayment,
  checkZaloPayment,
  verifyMoMoCallback,
  verifyZaloCallback,
  getConfig
} = paymentAPI;
