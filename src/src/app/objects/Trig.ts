export default class Trig{

  public readonly OrbitType = {
    COS: 'cos',
    SIN: 'sin'
  };

  public distance(point1: {x: number, y: number}, point2: {x: number, y: number}):number {
    let distx:number = point2.x - point1.x;
    let disty:number = point2.y - point1.y;
    return Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2));
  }
  public angle(point1: {x: number, y: number}, point2: {x: number, y: number}):number {

    let distx:number = point2.x - point1.x;
    let disty:number = point2.y - point1.y;
    let masterdist:number = this.distance(point1, point2);
    let primary_anglex:number = distx / masterdist;
    let anglex:number = Math.asin(primary_anglex) * 180 / Math.PI;
    let primary_angley:number = disty / masterdist;
    let angley:number = Math.asin(primary_angley) * 180 / Math.PI;
    let resultVal:number;
    if (disty < 0) {
        resultVal = anglex;
    }
    else if (disty >= 0 && distx >= 0) {
        resultVal = angley + 90;
    }
    else if (disty >= 0 && distx < 0) {
        resultVal = (angley * -1) - 90;
    }
    return resultVal;

  }
  public orbit(_center:number, _radius:number, _angle:number, orbitType: string):number {

    let resultVal;
    if (orbitType == this.OrbitType.COS) {
        resultVal = _center + (Math.cos(this.degreesToRadians(_angle)) * _radius);
    }
    if (orbitType == this.OrbitType.SIN) {
        resultVal = _center + (Math.sin(this.degreesToRadians(_angle)) * _radius);
    }
    return resultVal;
  }
  public degreesToRadians(deg:number):number{
    return deg * (Math.PI / 180)
  }
  public radiansToDegrees(rad:number):number{
    return rad * (180 / Math.PI)
  }
  public intersection(_tl:{x: number, y: number},_tr:{x: number, y: number},_br:{x: number, y: number},_bl:{x: number, y: number})
  {

    let a1 = _br.y - _tl.y;
    let b1 = _tl.x - _br.x;
    let a2 = _bl.y - _tr.y;
    let b2 = _tr.x - _bl.x;

    let denom = a1 * b2 - a2 * b1;
    //alert(_br.y);
    //if (denom == 0) return null;

    let c1 = _br.x * _tl.y - _tl.x * _br.y;
    let c2 = _bl.x * _tr.y - _tr.x * _bl.y;

    let p = {x:(b1 * c2 - b2 * c1)/denom, y:(a2 * c1 - a1 * c2)/denom};

    //if (getDistance(p, _br) > getDistance(_tl, _tr)) return null;
    //if (getDistance(p, _tl) > getDistance(_tl, _tr)) return null;
    //if (getDistance(p, _bl) > getDistance(_br, _bl)) return null;
    //if (getDistance(p, _tr) > getDistance(_br, _bl)) return null;

    return p;
  }
}
