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
    Rect: 'rect',
    Polygon: 'polygon',
    Text: 'text'
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
  public readonly PropertyTypes : any = {
    Number: 'number',
    Text: 'text',
    Checkbox: 'checkbox',
    Select: 'select'
  }
  public readonly Fonts : any = {
    Arial: 'Arial',
    Helvetica: 'Helvetica',
    Verdana: 'Verdana'
  }
  public readonly Alignments : any = {
    Left: 'left',
    Center: 'center',
    Right: 'right'
  }
  public readonly TweenUIValues:any = {
    baseWidth:100,
    baseHeight:30
  }
  public getProperties(type: string, includeNonNumerics: boolean = false):any{
    let properties: any = {
      x: {name: 'x', type: this.PropertyTypes.Number, default: 0},
      y: {name: 'y', type: this.PropertyTypes.Number, default: 0},
      alpha: {name: 'alpha', type: this.PropertyTypes.Number, default: 1},
      rotation: {name: 'rotation', type: this.PropertyTypes.Number, default: 0}
    }
    switch(type){
      case this.DisplayTypes.Image:
      case this.DisplayTypes.Rect:
      {
        properties.width = {name: 'width', type: this.PropertyTypes.Number, default: 72};
        properties.height = {name: 'height', type: this.PropertyTypes.Number, default: 72};
        break;
      }
      case this.DisplayTypes.Text:
      {
        properties.wordWrapWidth = {name: 'wordWrapWidth', type: this.PropertyTypes.Number, default: 72};
        properties.size = {name: 'size', type: this.PropertyTypes.Number, default: 12};
        break;
      }
      case this.DisplayTypes.Circle:
      {
        properties.radius = {name: 'radius', type: this.PropertyTypes.Number, default: 36};
        break;
      }
    }
    if (includeNonNumerics) {
      switch(type){
        case this.DisplayTypes.Image:
        {
          properties.src = {name: 'src', type: this.PropertyTypes.Text, default: 'none'};
          break;
        }
        case this.DisplayTypes.Text:
        case this.DisplayTypes.Circle:
        case this.DisplayTypes.Rect:
        {
          properties.color = {name: 'color', type: this.PropertyTypes.Text, default: '000000'};
          if (type == this.DisplayTypes.Text) {
            properties.text = {name: 'text', type: this.PropertyTypes.Text, default: 'Placeholder'};
            properties.font = {name: 'font', type: this.PropertyTypes.Text, default: 'Arial'};
          }
          break;
        }
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
      radius: 36,
      rotation: 0,
      strokeColor: 0x000000,
      strokeOpacity: 0,
      strokeWidth: 1,
      width: 72,
      height: 72
    }
  }
  public init(el: HTMLElement, _width: number, _height: number, backgroundColor: number):void{
    let width = _width !== undefined && _width !== null ? _width : 800;
    let height = _height !== undefined && _height !== null ? _height : 600;
    this.app = new PIXI.Application(width, height, {antialias: true, backgroundColor: backgroundColor, resolution: 1});
    el.appendChild(this.app.view);
    this.renderer = PIXI.autoDetectRenderer(width, height);
  }
  public createImage (src) {
    let texture = src.textureCacheIds !== undefined && src.textureCacheIds !== null ? src : PIXI.Texture.from(src)
    return new PIXI.Sprite(texture)
  }
  public createCircle (props) {
    let properties = this.getDefaultProperties()
    if (props !== undefined && props !== null) {
      for (let p in properties) {
        properties[p] = props[p]
      }
    }
    let g = new PIXI.Graphics()
    g.lineStyle(properties.strokeWidth, properties.strokeColor, properties.strokeOpacity)
    g.beginFill(properties.color, properties.opacity)
    g.drawCircle(properties.x, properties.y, properties.radius)
    g.endFill()
    console.log(g)
    return g
  }

  public createText (content, style, width) {
    let props = {fontFamily: style.fontFamily, fontSize: style.fontSize, fill: style.fill, align: style.align, fontWeight: style.fontWeight, wordWrap: style.wordWrap, wordWrapWidth: style.wordWrapWidth}
    let text = new PIXI.Text(content, props)
    // text.interactive = true
    return text
  }

  public createRect (props) {
    let properties = this.getDefaultProperties()
    if (props !== undefined && props !== null) {
      for (let p in properties) {
        properties[p] = props[p]
      }
    }
    let g = new PIXI.Graphics()
    g.beginFill(props.color)
    g.drawRect(properties.x, properties.y, properties.width, properties.height)
    g.endFill()
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
      case this.DisplayTypes.Text:{
        subTeir.text = 'Placeholder text';
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
    let props = this.getProperties(subTeir.type)
    for (let p in props) {
      subTeir[p] = props[p].default
    }
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
