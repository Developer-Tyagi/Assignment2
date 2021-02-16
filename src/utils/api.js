// import { Serializer, Deserializer } from 'jsonapi-serializer';

export function apiDeserialize(data) {
  return new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(
    data,
    (err, data) => data
  );
}

export function apiSerialize(data, type, options) {
  return new Serializer(type, options).serialize(data);
}

export function buildApiData(type, attributes) {
  return {
    data: {
      type,
      attributes
    }
  };
}
