//
//  XTUtil.m
//  xitenggame
//
//  Created by huibei on 17/3/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "XTUtil.h"
#import "CommonCrypto/CommonDigest.h"

@implementation XTUtil
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(digest:(NSString*)source callback:(RCTResponseSenderBlock)callBack){
  const char *cStr = [source UTF8String];
  unsigned char result[CC_MD5_DIGEST_LENGTH];
  CC_MD5(cStr, strlen(cStr), result);
  
  NSMutableString *md5str = [NSMutableString string];
  int count = sizeof(result)/sizeof(unsigned char);
  for (int i = 0; i<count; i++) {
    [md5str appendFormat:@"%02X", result[i]];
  }
  NSString* res = md5str.uppercaseString;
  NSArray* events = @[@[res]];
  callBack(@[[NSNull null], events]);
}
@end
