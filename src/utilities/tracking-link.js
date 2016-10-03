export default function (carrier, number) {
  switch (carrier.toLowerCase()) {
  case 'asendia':
    return {
      url: `http://tracking.asendiausa.com/t.aspx?p=${number}`,
      text: 'View on Asendia.com',
    };
  case 'dhl':
    return {
      url: `http://www.dhl.com/en/express/tracking.html?AWB=${number}&brand=DHL`,
      text: 'View on DHL.com',
    };
  case 'landmark':
    return {
      url: `https://mercury.landmarkglobal.com/tracking/track.php?trck=${number}&Submit=Track`,
      text: 'View on Landmarkglobal.com',
    };
  case 'ups':
    return {
      url: `https://wwwapps.ups.com/tracking/tracking.cgi?tracknum=${number}`,
      text: 'View on UPS.com',
    };
  case 'usps':
    return {
      url: `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${number}`,
      text: 'View on USPS.com',
    };
  default:
    return undefined;
  }
}
