export default function (carrier, number) {
  switch (carrier.toLowerCase()) {
  case 'asendia':
    return {
      url: `http://tracking.asendiausa.com/t.aspx?p=${number}`,
      text: number,
    };
  case 'dhl':
    return {
      url: `http://www.dhl.com/en/express/tracking.html?AWB=${number}&brand=DHL`,
      text: number,
    };
  case 'landmark':
    return {
      url: `https://mercury.landmarkglobal.com/tracking/track.php?trck=${number}&Submit=Track`,
      text: number,
    };
  case 'ups':
    return {
      url: `https://wwwapps.ups.com/tracking/tracking.cgi?tracknum=${number}`,
      text: number,
    };
  case 'usps':
    return {
      url: `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${number}`,
      text: number,
    };
  case 'fedex':
    return {
      url: `https://www.fedex.com/apps/fedextrack/?tracknumbers=${number}`,
      text: number,
    };
  default:
    return undefined;
  }
}
