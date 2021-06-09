"use strict";

import React, { Component, useEffect } from "react";

import { StyleSheet } from "react-native";

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  Viro3DObject,
  ViroQuad,
  ViroARSceneNavigator,
} from "react-viro";
import { Fire } from "../src/config";
import { getData } from "../src/utils";

export class BusinessCard extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.getUserData();
    this.getStatusPasien();

    this.state = {
      namaPasien: "initializing",
      beratBadan: "initializing",
      tinggiBadan: "initializing",
      tekananDarah: "initializing",
      detakJantung: "initializing",
      bmiPasien: "initializing",
      suhu: "initializing",
      photo: "initializing",
      statusBmiPasien: "process",
      statusSuhuPasien: "process",
    };
  }
  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false,
  };
  getStatusPasien() {
    console.log("cobain", this.state.namaPasien);
  }
  getUserData() {
    getData("user").then((res) => {
      console.log("data untuk ddaSHBOAR ", res);
      const data = res;
      const urlDOctor = data.uid;
      console.log("ini Url doctor", urlDOctor);
      Fire.database()
        .ref(`doctors/${urlDOctor}/dataAR/`)
        .once("value")
        .then((res) => {
          if (res.val()) {
            const data = res.val();
            const suhu = data.suhu;
            if (suhu > 38) {
              this.setState({
                statusSuhuPasien: "tidak_normal",
              });
            } else if (suhu <= 37 && suhu >= 36) {
              this.setState({
                statusSuhuPasien: "normal",
              });
            } else {
              this.setState({
                statusSuhuPasien: "tidak_normal",
              });
            }
            console.log("data news", data);
            const bmiPasien = data.bmiPasien;
            console.log("bmiPasiennn", bmiPasien);
            if (bmiPasien > 0 && bmiPasien < 17) {
              this.setState({
                statusBmiPasien: "kurang_BB_berat",
              });
            } else if (bmiPasien >= 17 && bmiPasien <= 18) {
              this.setState({
                statusBmiPasien: "kurang_BB_ringan",
              });
            } else if (bmiPasien > 18 && bmiPasien <= 25) {
              this.setState({
                statusBmiPasien: "BB_Normal",
              });
            } else if (bmiPasien > 25 && bmiPasien <= 27) {
              this.setState({
                statusBmiPasien: "lebih_BB_ringan",
              });
            } else if (bmiPasien > 27) {
              console.log("sudahdi mount");
              this.setState({
                statusBmiPasien: "lebih_BB_berat",
              });
            }
            this.setState({
              namaPasien: data.fullName,
              beratBadan: data.beratBadan,
              tinggiBadan: data.tinggiBadan,
              tekananDarah: data.tekananDarah,
              detakJantung: data.detakJantung,
              suhu: data.suhu,
              bmiPasien: data.bmiPasien,
              photo: data.photo,
            });
          }
        });
    });
  }

  getNoTrackingUI() {
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={initialized ? "Initializing AR..." : "No Tracking"} />
    );
  }

  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker
          autoFocus={true}
          target={"businessCard"}
          onAnchorFound={() =>
            this.setState({
              runAnimation: true,
            })
          }
        >
          <ViroNode key="card">
            <ViroNode
              opacity={0}
              position={[0.2, -0.03, 0.05]}
              animation={{
                name: "animateImage2",
                run: this.state.runAnimation,
              }}
            >
              <ViroFlexView
                rotation={[-90, 0, 0]}
                height={0.01}
                width={0.06}
                style={styles.card}
              >
                <ViroFlexView style={styles.cardWrapper2}>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroImage
                      height={0.015}
                      width={0.015}
                      style={styles.image}
                      source={{ uri: this.state.photo }}
                    />
                  </ViroFlexView>
                </ViroFlexView>
              </ViroFlexView>
            </ViroNode>
            <ViroNode
              opacity={0}
              position={[0, -0.03, 0]}
              animation={{
                name: "animateImage",
                run: this.state.runAnimation,
              }}
            >
              <ViroFlexView
                rotation={[-90, 0, 0]}
                height={0.07}
                width={0.06}
                style={styles.card}
              >
                <ViroFlexView style={styles.cardWrapper2}>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      textClipMode="None"
                      text={`nama_pasien`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`${this.state.namaPasien}`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={` `}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                </ViroFlexView>
                <ViroFlexView style={styles.cardWrapper2}>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      textClipMode="None"
                      text={`berat_badan`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`${this.state.beratBadan}Kg`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`sehat`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyleKeterangan}
                    />
                  </ViroFlexView>
                </ViroFlexView>
                <ViroFlexView style={styles.cardWrapper2}>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      textClipMode="None"
                      text={`tinggi_badan`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`${this.state.tinggiBadan}cm`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`sehat`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyleKeterangan}
                    />
                  </ViroFlexView>
                </ViroFlexView>
                <ViroFlexView style={styles.cardWrapper2}>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      textClipMode="None"
                      text={`BMI_pasien`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`${this.state.bmiPasien}`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`${this.state.statusBmiPasien}`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyleKeterangan}
                    />
                  </ViroFlexView>
                </ViroFlexView>
                <ViroFlexView style={styles.cardWrapper2}>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      textClipMode="None"
                      text={`tekanan_darah`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`${this.state.tekananDarah}mm/hg`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`sehat`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyleKeterangan}
                    />
                  </ViroFlexView>
                </ViroFlexView>
                <ViroFlexView style={styles.cardWrapper2}>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      textClipMode="None"
                      text={`detak_jantung`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapperSatuan}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`${this.state.detakJantung}bpm`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`sehat`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyleKeterangan}
                    />
                  </ViroFlexView>
                </ViroFlexView>
                <ViroFlexView style={styles.cardWrapper2}>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      textClipMode="None"
                      text={`suhu_badan`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={`${this.state.suhu}°C`}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyle}
                    />
                  </ViroFlexView>
                  <ViroFlexView style={styles.cardWrapper}>
                    <ViroText
                      position={[0.3, -0.02, 0]}
                      textClipMode="None"
                      text={this.state.statusSuhuPasien}
                      scale={[0.009, 0.009, 0.009]}
                      style={styles.textStyleKeterangan}
                    />
                  </ViroFlexView>
                </ViroFlexView>
              </ViroFlexView>
            </ViroNode>
            <ViroNode
              opacity={0}
              position={[0, 0, 0]}
              animation={{
                name: "animateViro",
                run: this.state.runAnimation,
              }}
            ></ViroNode>
          </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    );
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {this.state.isTracking ? this.getNoTrackingUI() : this.getARScene()}
      </ViroARScene>
    );
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true;
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false;
    }
  };
}

var styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Roboto",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "top",
    textAlign: "left",
    fontWeight: "bold",
  },
  textStyleSatuan: {
    fontFamily: "Roboto",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "top",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "column",
  },
  card2: {
    flexDirection: "column",
  },
  cardWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",

    flex: 0.5,
  },
  cardWrapperTinggi: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "red",
    flex: 0.5,
  },
  cardWrapperSatuan: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "blue",
    flex: 0.5,
  },
  cardWrapper2: {
    flexDirection: "row",
    alignItems: "flex-start",

    flex: 0.5,
  },
  textStyleKeterangan: {
    fontFamily: "Roboto",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "top",
    textAlign: "left",
    fontWeight: "bold",
    marginLeft: -8,
  },

  subText: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 0.5,
  },
});

ViroARTrackingTargets.createTargets({
  businessCard: {
    source: require("./res/rofi.jpg"),
    orientation: "Up",
    physicalWidth: 0.05, // real world width in meters
  },
});

ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: "rgba(255,255,255,1)",
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.5)",
  },
});

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      positionX: 0.055,
      positionZ: 0.003,
      opacity: 1.0,
    },
    easing: "Bounce",
    duration: 500,
  },
  animateImage2: {
    properties: {
      positionX: 0.01,
      positionZ: -0.03,
      opacity: 1.0,
    },
    easing: "Bounce",
    duration: 500,
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing: "Bounce",
    duration: 500,
  },
});

module.exports = BusinessCard;
