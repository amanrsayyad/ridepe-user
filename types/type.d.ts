declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  onPress: () => void | Promise<void>;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  textContentType?: string;
  keyboardType?: string;
}

export interface Ride {
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    first_name: string;
    last_name: string;
    car_seats: number;
  };
}
