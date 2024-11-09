
#import "Utils.h"
#import <AudioToolbox/AudioToolbox.h>
#import <UserNotifications/UserNotifications.h>

@implementation Utils

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(setBgClr:(float)red green:(float)green blue:(float)blue alpha:(float)alpha)
{
    @try {
        dispatch_async(dispatch_get_main_queue(), ^{
            UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
            rootViewController.view.backgroundColor = [[UIColor alloc] initWithRed:red/255 green:green/255 blue:blue/255 alpha:alpha];
        });
    } @catch (NSException *e) { }
}

RCT_EXPORT_METHOD(pSound: (nonnull NSInteger *) soundID)
{
    AudioServicesPlaySystemSound(soundID);
}

RCT_EXPORT_METHOD(rNotifs)
{
    [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
    [[UNUserNotificationCenter currentNotificationCenter] removeAllDeliveredNotifications];
}

RCT_EXPORT_MODULE()

@end
  
