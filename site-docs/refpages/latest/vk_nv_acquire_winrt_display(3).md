# VK_NV_acquire_winrt_display(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_acquire_winrt_display.html

## Table of Contents

- [Name](#_name)
- [VK_NV_acquire_winrt_display](#VK_NV_acquire_winrt_display)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_acquire_winrt_display - device extension

**Name String**

`VK_NV_acquire_winrt_display`

**Extension Type**

Device extension

**Registered Extension Number**

346

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_EXT_direct_mode_display](VK_EXT_direct_mode_display.html)

**Contact**

* 
Jeff Juliano [jjuliano](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_acquire_winrt_display] @jjuliano%0A*Here describe the issue or question you have about the VK_NV_acquire_winrt_display extension*)

**Last Modified Date**

2020-09-29

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Juliano, NVIDIA

This extension allows an application to take exclusive control of a display
on Windows 10 provided that the display is not already controlled by a
compositor.
Examples of compositors include the Windows desktop compositor, other
applications using this Vulkan extension, and applications that
[“Acquire”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaymanager.tryacquiretarget)
a
[“DisplayTarget”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaytarget)
using a [“WinRT”](https://docs.microsoft.com/en-us/uwp/api/) command such as
[“winrt::Windows::Devices::Display::Core::DisplayManager.TryAcquireTarget()”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaymanager.tryacquiretarget).

When control is acquired the application has exclusive access to the display
until control is released or the application terminates.
An application’s attempt to acquire is denied if a different application has
already acquired the display.

* 
[vkAcquireWinrtDisplayNV](vkAcquireWinrtDisplayNV.html)

* 
[vkGetWinrtDisplayNV](vkGetWinrtDisplayNV.html)

* 
`VK_NV_ACQUIRE_WINRT_DISPLAY_EXTENSION_NAME`

* 
`VK_NV_ACQUIRE_WINRT_DISPLAY_SPEC_VERSION`

1) What should the platform substring be for this extension:

**RESOLVED**: The platform substring is “Winrt”.

The substring “Winrt” matches the fact that the OS API exposing the
acquire and release functionality is called “WinRT”.

The substring “Win32” is wrong because the related “WinRT” API is
explicitly **not** a “Win32” API.
“WinRT” is a competing API family to the “Win32” API family.

The substring “Windows” is suboptimal because there could be more than one
relevant API on the Windows platform.
There is preference to use the more-specific substring “Winrt”.

2) Should [vkAcquireWinrtDisplayNV](vkAcquireWinrtDisplayNV.html) take a winRT DisplayTarget, or a
Vulkan display handle as input?

**RESOLVED**: A Vulkan display handle.
This matches the design of [vkAcquireXlibDisplayEXT](vkAcquireXlibDisplayEXT.html).

3) Should the acquire command be platform-independent named
“vkAcquireDisplayNV”, or platform-specific named
“vkAcquireWinrtDisplayNV”?

**RESOLVED**: Add a platform-specific command.

The inputs to the Acquire command are all Vulkan types.
None are WinRT types.
This opens the possibility of the winrt extension defining a
platform-independent acquire command.

The X11 acquire command does need to accept a platform-specific parameter.
This could be handled by adding to a platform-independent acquire command a
params structure to which platform-dependent types can be chained by
`pNext` pointer.

The prevailing opinion is that it would be odd to create a second
platform-independent function that is used on the Windows 10 platform, but
that is not used for the X11 platform.
Since a Windows 10 platform-specific command is needed anyway for converting
between vkDisplayKHR and platform-native handles, opinion was to create a
platform-specific acquire function.

4) Should the [vkGetWinrtDisplayNV](vkGetWinrtDisplayNV.html) parameter identifying a display be
named “deviceRelativeId” or “adapterRelativeId”?

**RESOLVED**: The WinRT name is “AdapterRelativeId”.
The name “adapter” is the Windows analog to a Vulkan “physical device”.
Vulkan already has precedent to use the name `deviceLUID` for the
concept that Windows APIs call “AdapterLuid”.
Keeping form with this precedent, the name “deviceRelativeId” is chosen.

5) Does [vkAcquireWinrtDisplayNV](vkAcquireWinrtDisplayNV.html) cause the Windows desktop compositor
to release a display?

**RESOLVED**: No.
[vkAcquireWinrtDisplayNV](vkAcquireWinrtDisplayNV.html) does not itself cause the Windows desktop
compositor to release a display.
This action must be performed outside of Vulkan.

Beginning with Windows 10 version 2004 it is possible to cause the Windows
desktop compositor to release a display by using the “Advanced display
settings” sub-page of the “Display settings” control panel.
See
[https://docs.microsoft.com/en-us/windows-hardware/drivers/display/specialized-monitors](https://docs.microsoft.com/en-us/windows-hardware/drivers/display/specialized-monitors)

6) Where can one find additional information about custom compositors for
Windows 10?

**RESOLVED**: Relevant references are as follows.

According to Microsoft’s documentation on
["building
a custom compositor"](https://docs.microsoft.com/en-us/windows-hardware/drivers/display/specialized-monitors-compositor), the ability to write a custom compositor is not a
replacement for a fullscreen desktop window.
The feature is for writing compositor apps that drive specialized hardware.

Only certain editions of Windows 10 support custom compositors,
["documented
here"](https://docs.microsoft.com/en-us/windows-hardware/drivers/display/specialized-monitors#windows-10-version-2004).
The product type can be queried from Windows 10.
See
[https://docs.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-getproductinfo](https://docs.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-getproductinfo)

* 
Revision 1, 2020-09-29 (Jeff Juliano)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_acquire_winrt_display).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
