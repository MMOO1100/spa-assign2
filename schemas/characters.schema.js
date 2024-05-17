import mongoose from 'mongoose';

// 상품(goods)에 대한 정보를 나타내는 스키마를 정의합니다.
const charactersSchema = new mongoose.Schema({
  characterId: {
    
    type: Number, 
    required: true, // 필수 항목입니다.
  },
  name: {
    type: String,
    required: true, // 필수 항목입니다.
  },
  health:{
    type:Number,
    default:500,
    required: true, // 필수 항목입니다.
  },
  power:{
    type:Number,
    default:100,
    required: true, // 필수 항목입니다.
  }

});

export default mongoose.model('Characters', charactersSchema);