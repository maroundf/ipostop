/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>

@import Firebase;
//#import "RNFBMessagingModule.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  //NSDictionary *appProperties = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                               moduleName:@"ipostop"
                                               initialProperties:nil]; //initialProperties:appProperties
  rootView.backgroundColor = [[UIColor alloc] initWithRed:0.18 green:0.18 blue:0.18 alpha:1.0];
  
  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:[NSBundle mainBundle]];
  UIViewController *launchScrenViewController = [storyboard instantiateViewControllerWithIdentifier:@"LaunchViewController"];
  launchScrenViewController.view.frame = self.window.bounds;
  rootView.loadingView = launchScrenViewController.view;
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *, id> *) options
{
  return [self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:url];
}

// Disable screenshot
/*- (void)applicationWillResignActive:(UIApplication *)application {
UIView *colourView = [[UIView alloc]initWithFrame:self.window.frame];
colourView.backgroundColor = [[UIColor alloc] initWithRed:0.18 green:0.18 blue:0.18 alpha:1.0];
colourView.tag = 1234;
colourView.alpha = 0;
[self.window addSubview:colourView];
[self.window bringSubviewToFront:colourView];
[UIView animateWithDuration:0.5 animations:^{
  colourView.alpha = 1;
}];
}
- (void)applicationDidBecomeActive:(UIApplication *)application {
UIView *colourView = [self.window viewWithTag:1234];
[UIView animateWithDuration:0.5 animations:^{
colourView.alpha = 0;
} completion:^(BOOL finished) {
[colourView removeFromSuperview];
}];
}*/

@end
