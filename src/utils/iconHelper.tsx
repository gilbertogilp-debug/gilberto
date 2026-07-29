import React from 'react';
import {
  Utensils, Scissors, Sparkles, Stethoscope, Pill, Dumbbell,
  ShoppingBag, Building2, Wheat, Dog, Church, Car,
  ShoppingCart, Calendar, Tag, Gift, Heart, UserCheck,
  LayoutGrid, Folder, Image, Star, ShieldCheck, Zap
} from 'lucide-react';

export const getCategoryIcon = (iconName: string, className: string = 'w-5 h-5') => {
  switch (iconName.toLowerCase()) {
    case 'utensils':
      return <Utensils className={className} />;
    case 'scissors':
      return <Scissors className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'stethoscope':
      return <Stethoscope className={className} />;
    case 'pill':
      return <Pill className={className} />;
    case 'dumbbell':
      return <Dumbbell className={className} />;
    case 'shoppingbag':
      return <ShoppingBag className={className} />;
    case 'building2':
      return <Building2 className={className} />;
    case 'wheat':
      return <Wheat className={className} />;
    case 'dog':
      return <Dog className={className} />;
    case 'church':
      return <Church className={className} />;
    case 'car':
      return <Car className={className} />;
    case 'shoppingcart':
      return <ShoppingCart className={className} />;
    case 'calendar':
      return <Calendar className={className} />;
    case 'tag':
      return <Tag className={className} />;
    case 'gift':
      return <Gift className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'usercheck':
      return <UserCheck className={className} />;
    default:
      return <LayoutGrid className={className} />;
  }
};
