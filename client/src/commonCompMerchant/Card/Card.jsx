// import React from 'react'
// import Circul from '../Circul/Circul';
// import './card.css'

// const Card = ({carddata}) => {
//   return (
//     <>
//       <div className="row justify-content-between">
//         {carddata?.map((item, index) => {
//           return (
//             <div
//               className={
//                 index === 0
//                   ? "cardbox Dcardbg1 col-lg-3 col-md-6 col-sm-12 "
//                   : index === 1
//                   ? " cardbox Dcardbg2 col-lg-3 col-md-6  col-sm-12"
//                   : index === 2
//                   ? "cardbox Dcardbg3 col-lg-3 col-md-6  col-sm-12"
//                   : " cardbox Dcardbg4 col-lg-3 col-md-6  col-sm-12"
//               }
//               key={index}
//             >
//               <div className="d-flex align-items-center">
//                 {item?.percentage>=0 ? (
//                     <Circul
//                       value={item.percentage?item.percentage:0}
//                       text={item.percentage?item.percentage + "%":0+"%"}
//                       pathColor={
//                         index === 0
//                           ? "#AB38D3"
//                           : index === 1
//                           ? "#3BC69D"
//                           : index === 2
//                           ? "#471EE4"
//                           : "#1EAAE7"
//                       }
//                       textColor={
//                         index === 0
//                           ? "#AB38D3"
//                           : index === 1
//                           ? "#3BC69D"
//                           : index === 2
//                           ? "#471EE4"
//                           : "#1EAAE7"
//                       }
//                       trailColor={
//                         index === 0
//                           ? "#ab38d38c"
//                           : index === 1
//                           ? "#3bc69d59"
//                           : index === 2
//                           ? "#471ee480"
//                           : "#1eaae77d"
//                       }
//                     />
//                   ):""}

//                 <div className="mx-2">
//                   <div className="namedata">{item.name}</div>
//                   <div className="numberData my-2">{item.amount===null?0:item.amount}</div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Card

import React from 'react';
import Circul from '../Circul/Circul';
import './card.css';

const Card = ({ carddata }) => {
  return (
    <div className="row justify-content-between">
      {carddata?.map((item, index) => {
        const cardBgColors = ["#AB38D3", "#3BC69D", "#471EE4", "#1EAAE7"];
        const cardBgTrailColors = ["#ab38d38c", "#3bc69d59", "#471ee480", "#1eaae77d"];
        const cardBgColor = cardBgColors[index % cardBgColors.length];
        const cardBgTrailColor = cardBgTrailColors[index % cardBgTrailColors.length];

        return (
          <div className={`cardbox Dcardbg${index + 1} col-lg-3 col-md-6 col-sm-12`} key={index}>
            <div className="d-flex align-items-center">
              {item?.percentage >= 0 && (
                <Circul
                  value={item.percentage ? item.percentage : 0}
                  text={item.percentage ? item.percentage + "%" : "0%"}
                  pathColor={cardBgColor}
                  textColor={cardBgColor}
                  trailColor={cardBgTrailColor}
                />
              )}
              <div className="mx-2">
                <div className="namedata">{item.name}</div>
                <div className="numberData my-2">{item.amount === null ? 0 : item.amount}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
