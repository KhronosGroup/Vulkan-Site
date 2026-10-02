# Full Screen Exclusive

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/full_screen_exclusive/README.html

## Table of Contents

- [Overview](#_overview)
- [Introduction](#_introduction)
- [*Reminder](#_reminder)

## Content

|  | The source for this sample can be found in the [Khronos Vulkan samples github repository](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/full_screen_exclusive). |
| --- | --- |

This code sample demonstrates how to incorporate the Vulkan extension `VK_EXT_full_screen_exclusive`.
This extension provides a solution for the full screen exclusion issue on Windows prior to the 11 version.
Windows prior to 11 cannot correctly get an exclusive full screen window, `VK_EXT_full_screen_exclusive` is applicable on Windows prior to  version 11 platform alone.

This sample provides a detailed procedure to activate full screen exclusive mode on Windows applications.
Users can switch display modes from: 1) windowed, 2) borderless fullscreen, and 3) exclusive fullscreen using keyboard inputs.

Configuring the `swapchain create info` using full screen exclusive extension **DOES NOT** automatically set the application window to full screen mode.
The following procedure shows how to activate full screen exclusive mode correctly:

1) recreate the `swapchain` using `full screen exclusive`.
2) recreate the `frame buffers` with the new `swapchain`.
3) configure the application window to **fullscreen mode** 4) execute the `acquire full screen exclusive EXT` call.

* 
More details can be found in the link:    [MonitorFromWindow function (winuser.h)](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-monitorfromwindow)
