# VK_ANDROID_external_format_resolve(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ANDROID_external_format_resolve.html

## Table of Contents

- [Name](#_name)
- [VK_ANDROID_external_format_resolve](#VK_ANDROID_external_format_resolve)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ANDROID_external_format_resolve - device extension

**Name String**

`VK_ANDROID_external_format_resolve`

**Extension Type**

Device extension

**Registered Extension Number**

469

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html)

**API Interactions**

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_KHR_dynamic_rendering

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Chris Forbes [chrisforbes](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ANDROID_external_format_resolve] @chrisforbes%0A*Here describe the issue or question you have about the VK_ANDROID_external_format_resolve extension*)

**Extension Proposal**

[VK_ANDROID_external_format_resolve](../../../../features/latest/features/proposals/VK_ANDROID_external_format_resolve.html)

**Last Modified Date**

2023-05-03

**IP Status**

No known IP claims.

**Contributors**

* 
Tobias Hector, AMD

* 
Chris Forbes, Google

* 
Jan-Harald Fredriksen, Arm

* 
Shahbaz Youssefi, Google

* 
Matthew Netsch, Qualcomm

* 
Tony Zlatsinki, Nvidia

* 
Daniel Koch, Nvidia

* 
Jeff Leger, Qualcomm

* 
Alex Walters, Imagination

* 
Andrew Garrard, Imagination

* 
Ralph Potter, Samsung

* 
Ian Elliott, Google

This extension enables rendering to Android Hardware Buffers with external
formats which cannot be directly represented as renderable in Vulkan,
including Y′CBCR formats.

* 
Extending [VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html):

[VkAndroidHardwareBufferFormatResolvePropertiesANDROID](VkAndroidHardwareBufferFormatResolvePropertiesANDROID.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceExternalFormatResolveFeaturesANDROID](VkPhysicalDeviceExternalFormatResolveFeaturesANDROID.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceExternalFormatResolvePropertiesANDROID](VkPhysicalDeviceExternalFormatResolvePropertiesANDROID.html)

* 
`VK_ANDROID_EXTERNAL_FORMAT_RESOLVE_EXTENSION_NAME`

* 
`VK_ANDROID_EXTERNAL_FORMAT_RESOLVE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_RESOLVE_PROPERTIES_ANDROID](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FORMAT_RESOLVE_FEATURES_ANDROID](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FORMAT_RESOLVE_PROPERTIES_ANDROID](VkStructureType.html)

If [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkResolveModeFlagBits](VkResolveModeFlagBits.html):

[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_ANDROID](VkResolveModeFlagBits.html)

* 
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html)

* 
Revision 1, 2023-05-34 (Tobias Hector)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ANDROID_external_format_resolve).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
