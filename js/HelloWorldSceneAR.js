"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroARScene,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroAnimations,
  ViroNode,
} from "react-viro";
import { Fire } from "../src/config";
import { getData } from "../src/utils";

export class BusinessCard extends Component {
  constructor(props) {
    super(props);

    this.getUserData();

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
      gender: "initializing",
      isTracking: false,
      photoGender: require("./res/local_spinner.jpg"),
    };
  }
  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false,
  };

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
            const PhotoGender = data.gender;
            if (PhotoGender === "pria") {
              this.setState({
                photoGender: require("./res/pria.png"),
              });
            } else if (PhotoGender === "wanita") {
              this.setState({
                photoGender: require("./res/wanita.png"),
              });
            } else {
              this.setState({
                photoGender: require("./res/local_spinner.jpg"),
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
              gender: data.gender,
            });
          }
        });
    });
  }

  getNoTrackingUI() {
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={isTracking ? "Initializing AR..." : "No Tracking"} />
    );
  }
  HideFunction(anchor) {
    console.log("ini anchor param", anchor);
    if (anchor.trackingMethod === "tracking") {
      this.setState({
        runAnimation: true,
      });
    } else if (anchor.trackingMethod === "lastKnownPose") {
      this.setState({
        runAnimation: false,
      });
    }
  }

  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker
          autoFocus={true}
          target={"businessCard"}
          onAnchorRemoved={() => console.log("halo")}
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
              position={[0.2, -0.03, 0.05]}
              animation={{
                name: "animateImage3",
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
                      height={0.07}
                      width={0.02}
                      style={styles.image}
                      source={this.state.photoGender}
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
                      text={``}
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
                      text={``}
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
                      style={styles.textStyleKeteranganTambahan}
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
                      style={styles.textStyleKeteranganTambahan}
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
                      style={styles.textStyleKeteranganTambahan}
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
    console.log("halo", this.state.isTracking);
    return (
      <ViroARScene
        onAnchorRemoved={(params, descki) =>
          console.log("anchor remooves", descki)
        }
        onTrackingUpdated={this._onInitialized}
      >
        {this.getARScene()}
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
  textStyleKeteranganTambahan: {
    fontFamily: "Roboto",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "top",
    textAlign: "left",
    fontWeight: "bold",
    marginLeft: -4,
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
    source: require("./res/bpjs.jpg"),
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
      positionX: 0.059,
      positionZ: 0.009,
      opacity: 1.0,
    },
    easing: "Bounce",
    duration: 500,
  },
  animateImage2: {
    properties: {
      positionX: 0.059,
      positionZ: -0.04,
      opacity: 1.0,
    },
    easing: "Bounce",
    duration: 500,
  },
  animateImage3: {
    properties: {
      positionX: 0.03,
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
