package com.megeshealth.ipostopcare;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.Promise;
import android.app.Activity;
import android.graphics.Bitmap;
import org.webrtc.SurfaceViewRenderer;
import com.oney.WebRTCModule.WebRTCView;
import android.view.PixelCopy;
import android.net.Uri;
import java.io.File;
import java.io.FileOutputStream;
import java.lang.Math;
import android.os.Handler;
import android.os.HandlerThread;
//import android.widget.Toast;

public class Wc extends ReactContextBaseJavaModule {
    
    public Wc(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Wc";
    }

    @ReactMethod
    public void screenShot(final int tag, ReadableMap options, final Promise promise) {
        try {
            ReactApplicationContext mReactContext = getReactApplicationContext();
            UIManagerModule uiManager = mReactContext.getNativeModule(UIManagerModule.class);
            uiManager.addUIBlock(new UIBlock() {
                public void execute(NativeViewHierarchyManager nvhm) {
                    final Activity activity = getCurrentActivity();
                    WebRTCView sView;
                    
                    //View sView = activity.getWindow().getDecorView().findViewById(android.R.id.content); // get whole screen content
                    try {
                        sView = (WebRTCView)nvhm.resolveView(tag);
                    } catch (Throwable e) {
                        promise.reject("No view found with the tag reference specified.");
                        return;
                    }
                    if (sView == null) {
                       promise.reject("No view found with the tag reference specified.");
                       return;
                    }
                    
                    SurfaceViewRenderer sfr = sView.surfaceViewRenderer;
                    if (sfr == null) {
                       promise.reject("No surface view renderer found.");
                       return;
                    }
                    
                    //String txt = "view is "; if (sfr == null) txt += "null"; else txt += "not null";
                    //Toast toast = Toast.makeText(mReactContext, "w1: "+sView.getWidth()+"; w2: "+sfr.getWidth()+"; h1: "+sView.getHeight()+"; h2: "+sfr.getHeight(), Toast.LENGTH_LONG); toast.show();
                    
                    final String fext = options.getString("format");
                    final int quality = (int) (options.getDouble("quality") * 100);
                    final int minw = (int) Math.round(options.getDouble("minw"));
                    final int minh = (int) Math.round(options.getDouble("minh"));
                    
                    final Bitmap bitmap = Bitmap.createBitmap(Math.max(sfr.getWidth(), minw), Math.max(sfr.getHeight(), minh), Bitmap.Config.ARGB_8888);
                    final HandlerThread handlerThread = new HandlerThread("CapturingView"); handlerThread.start();
                    
                    PixelCopy.request(sfr, bitmap, (result) -> {
                        if (result == PixelCopy.SUCCESS) {
                            try {
                            final File externalCacheDir = mReactContext.getExternalCacheDir();
                            final File internalCacheDir = mReactContext.getCacheDir();
                            final File cacheDir;
                            
                            if (externalCacheDir == null && internalCacheDir == null) promise.reject("No cache directory available");
                            if (externalCacheDir == null) cacheDir = internalCacheDir; else
                            if (internalCacheDir == null) cacheDir = externalCacheDir; else
                            cacheDir = externalCacheDir.getFreeSpace() > internalCacheDir.getFreeSpace() ? externalCacheDir : internalCacheDir;
                            
                            File imageFile = File.createTempFile("meges", "." + fext, cacheDir);
                            FileOutputStream outputStream = new FileOutputStream(imageFile);
                            bitmap.compress(fext.toLowerCase().contains("png") ? Bitmap.CompressFormat.PNG : Bitmap.CompressFormat.JPEG, quality, outputStream);
                            outputStream.flush(); outputStream.close();
                            
                            promise.resolve(Uri.fromFile(imageFile).toString());
                            } catch (Throwable e) { promise.reject(e); }
                        } else {
                            promise.reject("Error CapturingView.");
                        }
                        handlerThread.quitSafely();
                    }, new Handler(handlerThread.getLooper()));
                }
            });
        } catch (IllegalViewOperationException e) { promise.reject(e); }
    }
    
}
