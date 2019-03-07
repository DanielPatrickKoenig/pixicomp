declare var PIXI: any;
export default class PixiManager {
  private renderer;
  public app: any;
  public readonly _PIXI = PIXI;
  constructor(){
  }
  public readonly DisplayTypes = {
    Container: 'container',
    Sprite: 'sprite',
    Image: 'image',
    Circle: 'circle',
    Polygon: 'polygon'
  }
  public readonly Properties = {
    x: 'x',
    y: 'y',
    width: 'width',
    height: 'height',
    rotation: 'rotation',
    radius: 'r',
    alpha: 'alpha'
  }
  public getProperties(type: string):any{
    var properties: any = {
      x: 'x',
      y: 'y',
      alpha: 'alpha'
    }
    switch(type){
      case this.DisplayTypes.Image:
      {
        properties.width = 'width';
        properties.height = 'height';
        break;
      }
      case this.DisplayTypes.Circle:
      {
        properties.radius = 'radius';
        break;
      }
    }
    return properties;
  }
  private getDefaultProperties () {
    return {
      color: 0x000000,
      opacity: 1,
      x: 0,
      y: 0,
      radius: 72,
      rotation: 0,
      strokeColor: 0x000000,
      strokeOpacity: 0,
      strokeWidth: 1
    }
  }
  public init(el: HTMLElement, _width: number, _height: number, backgroundColor: number):void{
    var width = _width !== undefined && _width !== null ? _width : 800;
    var height = _height !== undefined && _height !== null ? _height : 600;
    this.app = new PIXI.Application(width, height, {antialias: true, backgroundColor: backgroundColor, resolution: 1});
    el.appendChild(this.app.view);
    this.renderer = PIXI.autoDetectRenderer(width, height);
  }
  public createImage (src) {
    var texture = src.textureCacheIds !== undefined && src.textureCacheIds !== null ? src : PIXI.Texture.from(src)
    return new PIXI.Sprite(texture)
  }
  public createCircle (props) {
    var properties = this.getDefaultProperties()
    if (props !== undefined && props !== null) {
      for (var p in properties) {
        properties[p] = props[p]
      }
    }
    var g = new PIXI.Graphics()
    g.lineStyle(properties.strokeWidth, properties.strokeColor, properties.strokeOpacity)
    g.beginFill(properties.color, properties.opacity)
    g.drawCircle(properties.x, properties.y, properties.radius)
    g.endFill()
    console.log(g)
    return g
  }

  public addTeir(teir, subTeir){
    switch(teir){
      case this.DisplayTypes.Circle:{

        break;
      }
      case this.DisplayTypes.Container:{

        break;
      }
      case this.DisplayTypes.Image:{
        subTeir.src = 'none';
        break;
      }
      case this.DisplayTypes.Polygon:{

        break;
      }
      case this.DisplayTypes.Sprite:{

        break;
      }
    }
    subTeir.isMainScope = false;
    subTeir.id = "teir_" + Math.random().toString().split(".").join("") + Math.random().toString().split(".").join("") + Math.random().toString().split(".").join("");
  }

  // public addTweenProperty(step, tween){
  //   switch(teir){
  //     case this.DisplayTypes.Circle:{

  //       break;
  //     }
  //     case this.DisplayTypes.Container:{

  //       break;
  //     }
  //     case this.DisplayTypes.Image:{
  //       subTeir.src = 'none';
  //       break;
  //     }
  //     case this.DisplayTypes.Polygon:{

  //       break;
  //     }
  //     case this.DisplayTypes.Sprite:{

  //       break;
  //     }
  //   }
  // }

}
