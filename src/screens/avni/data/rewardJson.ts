import { icons, images } from '../../../constants'
export const rewardJson = [
  {
    id: "123",
    name: "Starbucks India",
    icon: icons.starbacks,
    reward: 20,
    qrImage: "",
    qrCode: "",
    discount: "Flat 20% Off on 5th Purchase",
    expiry: "15th January, 2024",
    level: 2,
    maxLevel: 7,
    advertiser_id:'123'
  },
  {
    id: "345",
    name: "Starbucks India",
    reward: 35,
    icon: icons.starbacks,
    qrImage: "",
    qrCode: "",
    discount: "Flat 35% Off on 5th Purchase",
    expiry: "20th January, 2024",
    level: 3,
    maxLevel: 7,
    advertiser_id:'234'
  },
  {
    id: "234",
    name: "Starbucks India",
    icon: icons.starbacks,
    reward: 30,
    qrImage: images.qr,
    qrCode: "AC-10012316",
    discount: "Flat 30% Off on 5th Purchase",
    expiry: "25th January, 2024",
    level: 7,
    maxLevel: 7,
    advertiser_id:'345'
  },

]