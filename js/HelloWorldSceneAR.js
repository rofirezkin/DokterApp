"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  ViroAnimatedImage,
  ViroSpotLight,
  ViroDirectionalLight,
  ViroAmbientLight,
  ViroOrbitCamera,
  Viro3DObject,
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
      photoGender: require("./res/test.obj"),
    };
  }
  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false,
    masking: require("./res/grid_bg.jpg"),
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
                photoGender: require("./res/test.obj"),
              });
            } else if (PhotoGender === "wanita") {
              this.setState({
                photoGender: require("./res/woman.obj"),
              });
            } else {
              this.setState({
                photoGender: require("./res/test.obj"),
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
            <ViroSpotLight
              position={[0, -0.25, 0]}
              color="#777777"
              direction={[0, 0, -1]}
              attenuationStartDistance={5}
              attenuationEndDistance={10}
              innerAngle={5}
              outerAngle={20}
            />
            <ViroNode position={[-0.011, 0.001, -0.001]}>
              <ViroFlexView
                rotation={[-90, 0, 0]}
                style={styles.cardspiner}
              ></ViroFlexView>
              <ViroText
                rotation={[-90, 0, 0]}
                textClipMode="None"
                text={`DJ_${this.state.detakJantung}bpm`}
                scale={[0.005, 0.005, 0.005]}
                style={styles.textStyleDetail}
              />
            </ViroNode>
            <ViroNode position={[-0.0063, 0, -0.025]}>
              <ViroFlexView
                rotation={[-90, 0, 0]}
                style={styles.cardspiner}
              ></ViroFlexView>
              <ViroText
                rotation={[-90, 0, 0]}
                textClipMode="None"
                text={`TD_${this.state.tekananDarah}mm/hg`}
                scale={[0.005, 0.005, 0.005]}
                style={styles.textStyleDetail}
              />
            </ViroNode>
            <ViroNode position={[0.012, 0, -0.027]}>
              <ViroText
                rotation={[-90, 0, 0]}
                textClipMode="None"
                text={`suhu_${this.state.suhu}°C`}
                scale={[0.006, 0.006, 0.006]}
                style={styles.textStyleDetail}
              />
              <ViroFlexView
                rotation={[-90, 0, 0]}
                style={styles.cardspiner}
              ></ViroFlexView>
            </ViroNode>
            <ViroAmbientLight color="#ffffff" />

            <ViroNode position={[0, 0, 0.04]} rotation={[180, 0, 0]}>
              <Viro3DObject
                materials={["heart"]}
                source={this.state.photoGender}
                resources={[require("./res/Blank.mtl")]}
                type="OBJ"
                scale={[0.0005, 0.0005, 0.0005]}
              />
            </ViroNode>

            {/* <ViroNode
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
            </ViroNode> */}
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
  cardspiner: {
    backgroundColor: "red",
    width: 0.001,
    height: 0.001,
  },
  textStyleDetail: {
    paddingLeft: 9,
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
    source: require("./res/ktpbaru.jpg"),
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
  heart: {
    lightingModel: "Blinn",
    diffuseTexture: require("./res/grid_bg.jpg"),
    specularTexture: require("./res/grid_bg.jpg"),
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
