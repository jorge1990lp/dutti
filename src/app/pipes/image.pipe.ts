import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(url: string): string {
    const arrayUrl = url.split('/');
    const id = arrayUrl[arrayUrl.length-2];
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }
}