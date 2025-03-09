"use server";

import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export const isMobileDevice = async (): Promise<boolean> => {
  if (typeof process === 'undefined') {
    throw new Error('[Server method] вы импортируете серверный модуль за пределами сервера');
  }

  try {
    const { get } = headers();
    const ua = get('user-agent');

    // Если user-agent отсутствует, считаем, что это не мобильное устройство
    if (!ua) {
      return false;
    }

    const device = new UAParser(ua).getDevice();

    // Возвращаем true только если device.type строго равен 'mobile'
    return device.type === 'mobile';
  } catch (error) {
    console.error('Ошибка при определении типа устройства:', error);
    // В случае ошибки считаем, что это не мобильное устройство
    return false;
  }
};