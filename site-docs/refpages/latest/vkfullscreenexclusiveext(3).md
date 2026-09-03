# VkFullScreenExclusiveEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFullScreenExclusiveEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFullScreenExclusiveEXT - Hint values an application can specify affecting full-screen transition behavior

Possible values of
`VkSurfaceFullScreenExclusiveInfoEXT`::`fullScreenExclusive` are:

// Provided by VK_EXT_full_screen_exclusive
typedef enum VkFullScreenExclusiveEXT {
    VK_FULL_SCREEN_EXCLUSIVE_DEFAULT_EXT = 0,
    VK_FULL_SCREEN_EXCLUSIVE_ALLOWED_EXT = 1,
    VK_FULL_SCREEN_EXCLUSIVE_DISALLOWED_EXT = 2,
    VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT = 3,
} VkFullScreenExclusiveEXT;

* 
[VK_FULL_SCREEN_EXCLUSIVE_DEFAULT_EXT](#) specifies that the
implementation **should** determine the appropriate full-screen method by
whatever means it deems appropriate.

* 
[VK_FULL_SCREEN_EXCLUSIVE_ALLOWED_EXT](#) specifies that the
implementation **may** use full-screen exclusive mechanisms when available.
Such mechanisms **may** result in better performance and/or the
availability of different presentation capabilities, but **may** require a
more disruptive transition during swapchain initialization, first
presentation and/or destruction.

* 
[VK_FULL_SCREEN_EXCLUSIVE_DISALLOWED_EXT](#) specifies that the
implementation **should** avoid using full-screen mechanisms which rely on
disruptive transitions.

* 
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](#) specifies that
the application will manage full-screen exclusive mode by using the
[vkAcquireFullScreenExclusiveModeEXT](vkAcquireFullScreenExclusiveModeEXT.html) and
[vkReleaseFullScreenExclusiveModeEXT](vkReleaseFullScreenExclusiveModeEXT.html) commands.

[VK_EXT_full_screen_exclusive](VK_EXT_full_screen_exclusive.html), [VkSurfaceFullScreenExclusiveInfoEXT](VkSurfaceFullScreenExclusiveInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkFullScreenExclusiveEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
