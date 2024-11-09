
#import "Wc.h"
#import <AVFoundation/AVFoundation.h>
#import <React/RCTLog.h>
#import <React/UIView+React.h>
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>
#import <React/RCTUIManager.h>
#if __has_include(<React/RCTUIManagerUtils.h>)
#import <React/RCTUIManagerUtils.h>
#endif
#import <React/RCTBridge.h>
#if !TARGET_OS_OSX
#import <WebRTC/RTCEAGLVideoView.h>
#endif
#if !TARGET_OS_OSX
#import <WebRTC/RTCMTLVideoView.h>
#else
#import <WebRTC/RTCMTLNSVideoView.h>
#endif

@implementation Wc

- (dispatch_queue_t)methodQueue
{
  return RCTGetUIManagerQueue();
}

@synthesize bridge = _bridge;

RCT_EXPORT_METHOD(screenShot:(nonnull NSNumber *)tag
                  withOptions:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {

    UIView *sView = viewRegistry[tag];
    if (!sView) {
      reject(RCTErrorUnspecified, @"No view found with the tag reference specified.", nil);
      return;
    }

    UIView *sfr;
    #if defined(RTC_SUPPORTS_METAL)
    #if !TARGET_OS_OSX
        for (UIView *v in sView.subviews) if ([v isKindOfClass:[RTCMTLVideoView class]]) { sfr = v; break; }
    #else
        for (UIView *v in sView.subviews) if ([v isKindOfClass:[RTCMTLNSVideoView class]]) { sfr = v; break; }
    #endif
    #else
    #if !TARGET_OS_OSX
        for (UIView *v in sView.subviews) if ([v isKindOfClass:[RTCEAGLVideoView class]]) { sfr = v; break; }
    #else
        for (UIView *v in sView.subviews) if ([v isKindOfClass:[RTCMTLNSVideoView class]]) { sfr = v; break; }
          #endif
    #endif
    if(!sfr) sfr = sView;
    
    CGFloat minw = [RCTConvert CGFloat:options[@"minw"]];
    CGFloat minh = [RCTConvert CGFloat:options[@"minh"]];
    CGSize size = sfr.bounds.size;
    if (minw > size.width) size.width = minw;
    if (minh > size.height) size.height = minh;
    UIGraphicsBeginImageContextWithOptions(size, NO, 0);
    
    BOOL success = [sfr drawViewHierarchyInRect:(CGRect){CGPointZero, size} afterScreenUpdates:YES];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    if (!success) {
      reject(RCTErrorUnspecified, @"The view cannot be captured due to potential technical or security limitations.", nil);
      return;
    }

    if (!image) {
      reject(RCTErrorUnspecified, @"The view cannot be captured due to issues in graphics of current image context.", nil);
      return;
    }

    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{

      NSData *data;
      NSString *format = [RCTConvert NSString:options[@"format"]];
      if ([format isEqualToString:@"jpg"]) {
        CGFloat quality = [RCTConvert CGFloat:options[@"quality"]];
        data = UIImageJPEGRepresentation(image, quality);
      }
      else data = UIImagePNGRepresentation(image);

      NSError *error = nil;
      NSString *res = nil;
      NSString *path = RCTTempFilePath(format, &error);
      
      if (path && !error) if ([data writeToFile:path options:(NSDataWritingOptions)0 error:&error]) res = path;
      
      if (res && !error) {
        resolve(res);
        return;
      }
      if (error) reject(RCTErrorUnspecified, error.localizedDescription, error);
      else reject(RCTErrorUnspecified, @"screenShot unknown error.", nil);
    });
  }];
}

RCT_EXPORT_MODULE()

@end
  
