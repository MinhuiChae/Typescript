// import { setWith } from 'lodash';
// import {Invitation,Ticket,Bag,Audience,TicketOffice} from '../chapter1';
(function (w) {
    var m = {
        getWeight: function (info) {
            if (info.shape == 'square') {
                return info.width * info.height;
            }
            else if (info.shape == 'triangle') {
                return (info.width * info.height) / 2;
            }
            else if (info.shape == 'circle') {
                return info.width * info.width * 3.14;
            }
        }
    };
    w.shapeModule = m;
})(window);
