import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import SearchBar from "react-native-dynamic-search-bar";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
export default class Map extends Component {
  state = {
    mapStyle: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#242f3e",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#746855",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#242f3e",
          },
        ],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#263c3f",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#6b9a76",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#38414e",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#212a37",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9ca5b3",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#746855",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#1f2835",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#f3d19c",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#2f3948",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#d59563",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#17263c",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#515c6d",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#17263c",
          },
        ],
      },
    ],
    region: {},
    latitude: null,
    longitude: null,
    error: null,
    isListingSelected: false,
    mapRef: {},
    search: "",
  };

  componentDidUpdate = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = location.coords;
    this.setState({
      latitude: latitude,
      longitude: longitude,
    });
  };
  goToUserLocationHandler = async () => {
    if (this.state.longitude && this.state.latitude) {
      this.state.mapRef.animateToRegion({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;
      this.setState({
        latitude: latitude,
        longitude: longitude,
      });

      this.state.mapRef.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };
  Item = ({ title }) => (
    <View
      style={{
        backgroundColor: this.props.theme ? "#444444" : "white",
        padding: 20,
        width: "100%",
      }}
    >
      <Text
        style={{ color: this.props.theme ? "white" : "black", fontSize: 26 }}
      >
        {title}
      </Text>
    </View>
  );
  render() {
    const renderItem = ({ item }) => <this.Item title={item.title} />;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={map => {
            this.state.mapRef = map;
          }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={this.props.theme ? this.state.mapStyle : null}
          showsUserLocation={true}
          zoomControlEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          showsBuildings={true}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78828, longitude: -122.4325 }}
            title="this is a marker"
            description="this is a marker example"
          />
          <Marker
            coordinate={{ latitude: 37.7999, longitude: -122.4322 }}
            title="this is a marker"
            description="this is a marker example"
          />
          <Marker
            coordinate={{ latitude: 37.7699, longitude: -122.4322 }}
            title="this is a marker"
            description="this is a marker example"
          />
        </MapView>
        <SearchBar
          style={{ position: "absolute", top: "10%" }}
          placeholder="Search here"
          onPress={() => this.setState({ search: "" })}
          onChangeText={text => this.setState({ search: text })}
          darkMode={this.props.theme}
        />
        {this.state.search.length !== 0 ? (
          <FlatList
            data={DATA}
            renderItem={renderItem}
            style={{
              position: "absolute",
              top: "16%",
              borderRadius: 10,
              width: "90%",
              zIndex: 1,
            }}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text></Text>
        )}

        <TouchableOpacity
          style={{
            position: "absolute",
            top: "20%",
            right: "3%",
            width: 40,
            backgroundColor: this.props.theme ? "#444444" : "white",
            height: 40,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            this.props.changeTheme();
          }}
        >
          <Ionicons
            name="options-outline"
            size={24}
            color={!this.props.theme ? "black" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.goToUserLocationHandler();
          }}
          style={{
            position: "absolute",
            top: "27%",
            right: "3%",
            width: 40,
            backgroundColor: this.props.theme ? "#444444" : "white",
            height: 40,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome
            name="location-arrow"
            size={24}
            color={!this.props.theme ? "black" : "white"}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
