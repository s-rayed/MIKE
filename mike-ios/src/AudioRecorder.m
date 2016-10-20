//
//  AudioRecorder.m
//  meowth
//
//  Created by Yacine Rezgui on 26/07/2015.
//  Copyright (c) 2015 Yacine Rezgui. All rights reserved.
//

#import "AudioRecorder.h"

@implementation AudioRecorder {
  AVAudioRecorder *_audioRecorder;
}

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  return @{
    @"AudioQuality": @{
      @"MIN": @(AVAudioQualityMin),
      @"LOW": @(AVAudioQualityLow),
      @"MEDIUM": @(AVAudioQualityMedium),
      @"HIGH": @(AVAudioQualityHigh),
      @"MAX": @(AVAudioQualityMax),
      @"MIN": @(AVAudioQualityMin),
    }
  };
}

- (NSString *) applicationDocumentsDirectory
{
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *basePath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
  return basePath;
}


RCT_EXPORT_METHOD(setup:(NSString *)filename callback:(RCTResponseSenderBlock)callback)
{
  AVAudioSession *_audioSession = [AVAudioSession sharedInstance];
  NSError *err = nil;
  [_audioSession setCategory :AVAudioSessionCategoryPlayAndRecord error:&err];
  
  if(err){
    NSLog(@"audioSession: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
    return;
  }
  
  err = nil;
  
  [_audioSession setActive:YES error:&err];
  
  if(err){
    NSLog(@"audioSession: %@ %ld %@", [err domain], (long)[err code], [[err userInfo] description]);
    return;
  }
  
  err = nil;
  
  NSString*     fullPath  = [[self applicationDocumentsDirectory] stringByAppendingPathComponent:filename];
  NSURL*        fileUrl   = [NSURL fileURLWithPath:fullPath];
  NSDictionary* settings  = @{
    AVEncoderAudioQualityKey: [NSNumber numberWithInt:AVAudioQualityHigh],
    AVSampleRateKey: [NSNumber numberWithInt:48000],
    AVNumberOfChannelsKey: [NSNumber numberWithInt:2],
};
  
  NSLog(@"file URL: %@", fullPath);
  
  _audioRecorder = [[AVAudioRecorder alloc] initWithURL:fileUrl settings:settings error:&err];
  [_audioRecorder prepareToRecord];
  
  callback(@[fullPath]);
}

RCT_EXPORT_METHOD(start)
{
  [_audioRecorder record];
}

RCT_EXPORT_METHOD(stop)
{
  [_audioRecorder stop];
}

@end
