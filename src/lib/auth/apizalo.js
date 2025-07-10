import CryptoJS from 'crypto-js';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';

class ZaloPayAPI {
  constructor() {
    this.zaloConfig = {
      appId: process.env.ZALO_APP_ID,
      key1: process.env.ZALO_KEY1,
      endpoint: process.env.ZALO_ENDPOINT || 'https://sb-openapi.zalopay.vn/v2/create',
      redirectUrl: process.env.ZALO_REDIRECT_URL,
      callbackUrl: process.env.ZALO_CALLBACK_URL
    };
  }

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

  async queryZaloOrder(appTransId) {
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

  getConfig() {
    return {
      appId: this.zaloConfig.appId,
      redirectUrl: this.zaloConfig.redirectUrl
    };
  }
}

const zaloAPI = new ZaloPayAPI();

export default zaloAPI;
export const {
  createZaloPayment,
  checkZaloPayment,
  verifyZaloCallback,
  getConfig,
  queryZaloOrder
} = zaloAPI; 