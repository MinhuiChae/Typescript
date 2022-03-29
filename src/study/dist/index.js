// import { setWith } from 'lodash';
// import {Invitation,Ticket,Bag,Audience,TicketOffice} from '../chapter1';
(function (w) {
    var m = {
        getWeight: function (info) {
            alert(info.shape);
            return 30;
        }
    };
    w.shapeModule = m;
})(window);
