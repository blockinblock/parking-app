export class Parking {
  sessionId: string;
  vehicleId: string;
  startTime: string;
  endTime: string;
  cost: number;

  constructor(
    sessionId: string,
    vehicleId: string,
    startTime: string,
    endTime: string,
    cost: number
  ) {
    this.sessionId = sessionId;
    this.vehicleId = vehicleId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.cost = cost;
  }
}
