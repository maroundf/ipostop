package com.megeshealth.ipostopcares;

import android.os.Bundle;
import android.os.Build;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.facebook.react.ReactRootView;
//import android.view.WindowManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "ipostop";
  }
  
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new DefaultReactActivityDelegate(this, getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled()) {
      };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel notificationChannel = new NotificationChannel("MainChannel", "MainChannel", NotificationManager.IMPORTANCE_HIGH);
            notificationChannel.setShowBadge(true);
            notificationChannel.setDescription("MainChannel");
            notificationChannel.enableVibration(true);
            notificationChannel.enableLights(true);
            notificationChannel.setVibrationPattern(new long[]{400, 200, 400});
            notificationChannel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(notificationChannel);
        }
        
        //Disable screenshot
        //getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
    }

}
