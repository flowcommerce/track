export default function (carrier, number) {
  switch (carrier.toLowerCase()) {
    case 'asendia':
      return {
        url: `http://tracking.asendiausa.com/t.aspx?p=${number}`,
        text: number,
      };
    case 'canada-post':
      return {
        url: `https://www.canadapost.ca/cpotools/apps/track/personal/findByTrackNumber?trackingNumber=${number}`,
        text: number,
      };
    case 'dhl':
      return {
        url: `https://mydhl.express.dhl/us/en/tracking.html#/results?id=${number}&brand=DHL`,
        text: number,
      };
    case 'dhl-ecommerce':
      return {
        url: `https://webtrack.dhlglobalmail.com/?trackingnumber=${number}`,
        text: number,
      };
    case 'dhl-global-mail':
      return {
        url: `https://webtrack.dhlglobalmail.com/?trackingnumber=${number}`,
        text: number,
      };
    case 'dhl-parcel':
      return {
        url: `https://webtrack.dhlglobalmail.com/?trackingnumber=${number}`,
        text: number,
      };
    case 'landmark':
      return {
        url: `https://track.landmarkglobal.com/?trck=${number}`,
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
    case 'sf-express':
      return {
        url: `http://www.sf-express.com/cn/en/dynamic_function/waybill/#search/bill-number/${number}`,
        text: number,
      };
    default:
      return undefined;
  }
}
