/**
 * Created by wuqingxin on 18/03/06.
 */
import Vue from 'vue';

/**
 * validate username
 * @param email
 * @returns {boolean}
 */
export function validateUsername(username){
  if(username == "" || username.length > 30){
    return false;
  }else{
    return true;
  }
}

/**
 * validate password
 * @param password
 * @returns {boolean}
 */
export function validatePassword(password){
  const ps = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  return ps.test(password);
}
