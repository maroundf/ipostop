package com.megeshealth.ipostopcare;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import android.app.Activity;
import android.graphics.Color;
import android.net.Uri;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.media.ToneGenerator;
import android.media.AudioManager;
import android.app.NotificationManager;
import android.content.Context;
import me.leolin.shortcutbadger.ShortcutBadger;

public class Utils extends ReactContextBaseJavaModule {
    
    public Utils(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Utils";
    }

    @ReactMethod
    public void setBgClr(String color) {
        final Activity activity = getCurrentActivity();
        if (activity == null) return;
        try {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    activity.getWindow().getDecorView().getRootView().setBackgroundColor(Color.parseColor(color));
                }
            });
        } catch (Exception e) { }
    }

    @ReactMethod
    public void pSound(int soundID) {
        Context mContext = getReactApplicationContext();
        if(soundID > 999) {
            Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            Ringtone r = RingtoneManager.getRingtone(mContext, notification);
            r.play();
        }
        else {
            final ToneGenerator toneGen = new ToneGenerator(AudioManager.STREAM_SYSTEM, 100);
            toneGen.startTone(soundID);
        }
    }

    @ReactMethod
    public void rNotifs() {
        Context mContext = getReactApplicationContext();
        NotificationManager notificationManager = (NotificationManager)mContext.getSystemService(mContext.NOTIFICATION_SERVICE);
        notificationManager.cancelAll();
        ShortcutBadger.removeCount(mContext);
    }
    
}
