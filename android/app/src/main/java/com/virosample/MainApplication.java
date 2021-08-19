package com.virosample;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;

import com.reactnativecommunity.picker.RNCPickerPackage;
import com.reactnativecommunity.picker.RNCPickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.viromedia.bridge.ReactViroPackage;
import com.facebook.soloader.SoLoader;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
         new MainReactPackage(),
            new RNFetchBlobPackage(),
          
            new RNCPickerPackage(),
            new RNCPickerPackage(),
            new AsyncStoragePackage(),
            new ImagePickerPackage(),
         new SafeAreaContextPackage(),
            new RNGestureHandlerPackage(),
         new ReactViroPackage(ReactViroPackage.ViroPlatform.valueOf(BuildConfig.VR_PLATFORM))
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
