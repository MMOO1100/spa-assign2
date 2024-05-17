import mongoose from 'mongoose';

// 상품(goods)에 대한 정보를 나타내는 스키마를 정의합니다.
const ItemsSchema = new mongoose.Schema({
  itemCode: {
    type: Number, 
    required: true, // 필수 항목입니다.
  },
  itemName: {
    type: String,
    required: true, // 필수 항목입니다.
  },
  itemStat:{
    health:{
        type:Number,
        required: true, // 필수 항목입니다.
      },
      power:{
        type:Number,
        required: true, // 필수 항목입니다.
      }
  }
  
});

export default mongoose.model('Items',ItemsSchema);