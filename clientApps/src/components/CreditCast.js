import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const CreditCast = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!props.list) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props]);
  return (
    <View>
      <View style={styles.container}>
        {loading ? (
          <SkeletonPlaceholder>
            <View style={styles.imageCard} />
            <View style={{ width: 115, height: 13, marginTop: 5, borderRadius: 10 }} />
            <View style={{ width: 115, height: 13, marginTop: 5, borderRadius: 10 }} />
          </SkeletonPlaceholder>
        ) : (
          <>
            {props.list.profile_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${props.list.profile_path}`,
                }}
                style={styles.imageCard}
              />
            ) : (
              <Image
                source={{
                  uri: `https://via.placeholder.com/67x100?text=Image+not+found`,
                }}
                style={styles.imageCard}
              />
            )}

            <Text numberOfLines={2} style={styles.name}>
              {props.list.name}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default CreditCast;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  imageCard: {
    width: 67,
    height: 100,
    borderRadius: 10,
  },
  name: {
    width: 67,
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
    color: "white",
  },
});
