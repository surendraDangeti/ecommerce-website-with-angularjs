import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  getImageUrl(item: { type: string; data: number[] }): string {
    if (item.data) {
      const base64Image = this.arrayBufferToBase64(item.data, item.type);
      return `data:${item.type};base64,${base64Image}`;
    } else {
      return ''; 
    }
  }

  private arrayBufferToBase64(buffer: number[] | undefined, type: string): string {
    if (!buffer) {
      return '';
    }

    const binary = buffer.map((byte) => String.fromCharCode(byte)).join('');
    const base64 = btoa(binary);
    return base64;
  }
}
