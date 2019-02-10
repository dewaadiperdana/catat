import 'intl';
import 'intl/locale-data/jsonp/id';

export const currencyFormatter = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', currencyDisplay: 'symbol' }).format(number);
};