using BloodLineAPI.Model;
using System.Collections.Generic;

namespace BloodLineAPI.BAL
{
    public class StateBAL
    {
        public List<StateModel> GetAllStates()
        {
            return new List<StateModel>
            {
                new StateModel { StateId = 1, StateName = "Andhra Pradesh" },
                new StateModel { StateId = 2, StateName = "Arunachal Pradesh" },
                new StateModel { StateId = 3, StateName = "Assam" },
                new StateModel { StateId = 4, StateName = "Bihar" },
                new StateModel { StateId = 5, StateName = "Chhattisgarh" },
                new StateModel { StateId = 6, StateName = "Goa" },
                new StateModel { StateId = 7, StateName = "Gujarat" },
                new StateModel { StateId = 8, StateName = "Haryana" },
                new StateModel { StateId = 9, StateName = "Himachal Pradesh" },
                new StateModel { StateId = 10, StateName = "Jharkhand" },
                new StateModel { StateId = 11, StateName = "Karnataka" },
                new StateModel { StateId = 12, StateName = "Kerala" },
                new StateModel { StateId = 13, StateName = "Madhya Pradesh" },
                new StateModel { StateId = 14, StateName = "Maharashtra" },
                new StateModel { StateId = 15, StateName = "Manipur" },
                new StateModel { StateId = 16, StateName = "Meghalaya" },
                new StateModel { StateId = 17, StateName = "Mizoram" },
                new StateModel { StateId = 18, StateName = "Nagaland" },
                new StateModel { StateId = 19, StateName = "Odisha" },
                new StateModel { StateId = 20, StateName = "Punjab" },
                new StateModel { StateId = 21, StateName = "Rajasthan" },
                new StateModel { StateId = 22, StateName = "Sikkim" },
                new StateModel { StateId = 23, StateName = "Tamil Nadu" },
                new StateModel { StateId = 24, StateName = "Telangana" },
                new StateModel { StateId = 25, StateName = "Tripura" },
                new StateModel { StateId = 26, StateName = "Uttar Pradesh" },
                new StateModel { StateId = 27, StateName = "Uttarakhand" },
                new StateModel { StateId = 28, StateName = "West Bengal" },
                new StateModel { StateId = 29, StateName = "Andaman and Nicobar Islands" },
                new StateModel { StateId = 30, StateName = "Chandigarh" },
                new StateModel { StateId = 31, StateName = "Dadra and Nagar Haveli and Daman and Diu" },
                new StateModel { StateId = 32, StateName = "Delhi" },
                new StateModel { StateId = 33, StateName = "Jammu and Kashmir" },
                new StateModel { StateId = 34, StateName = "Ladakh" },
                new StateModel { StateId = 35, StateName = "Lakshadweep" },
                new StateModel { StateId = 36, StateName = "Puducherry" }
            };
        }
    }
}
