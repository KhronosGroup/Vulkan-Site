# VK_EXT_host_image_copy(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_host_image_copy.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_host_image_copy](#VK_EXT_host_image_copy)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_host_image_copy - device extension

**Name String**

`VK_EXT_host_image_copy`

**Extension Type**

Device extension

**Registered Extension Number**

271

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

         or

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_copy_commands2](VK_KHR_copy_commands2.html)

     and

     [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_host_image_copy] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_host_image_copy extension*)

**Extension Proposal**

[VK_EXT_host_image_copy](../../../../features/latest/features/proposals/VK_EXT_host_image_copy.html)

**Last Modified Date**

2023-04-26

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Faith Ekstrand, Collabora

* 
Hans-Kristian Arntzen, Valve

* 
Piers Daniell, NVIDIA

* 
Jan-Harald Fredriksen, Arm

* 
James Fitzpatrick, Imagination

* 
Daniel Story, Nintendo

This extension allows applications to copy data between host memory and
images on the host processor, without staging the data through a
GPU-accessible buffer.
This removes the need to allocate and manage the buffer and its associated
memory.
On some architectures it may also eliminate an extra copy operation.
This extension additionally allows applications to copy data between images
on the host.

To support initializing a new image in preparation for a host copy, it is
now possible to transition a new image to [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) or
other host-copyable layouts via [vkTransitionImageLayoutEXT](vkTransitionImageLayout.html).
Additionally, it is possible to perform copies that preserve the swizzling
layout of the image by using the [VK_HOST_IMAGE_COPY_MEMCPY_BIT_EXT](VkHostImageCopyFlagBits.html)
flag.
In that case, the memory size needed for copies to or from a buffer can be
retrieved by chaining [VkSubresourceHostMemcpySizeEXT](VkSubresourceHostMemcpySize.html) to `pLayout`
in [vkGetImageSubresourceLayout2EXT](vkGetImageSubresourceLayout2.html).

* 
[vkCopyImageToImageEXT](vkCopyImageToImage.html)

* 
[vkCopyImageToMemoryEXT](vkCopyImageToMemory.html)

* 
[vkCopyMemoryToImageEXT](vkCopyMemoryToImage.html)

* 
[vkGetImageSubresourceLayout2EXT](vkGetImageSubresourceLayout2.html)

* 
[vkTransitionImageLayoutEXT](vkTransitionImageLayout.html)

* 
[VkCopyImageToImageInfoEXT](VkCopyImageToImageInfo.html)

* 
[VkCopyImageToMemoryInfoEXT](VkCopyImageToMemoryInfo.html)

* 
[VkCopyMemoryToImageInfoEXT](VkCopyMemoryToImageInfo.html)

* 
[VkHostImageLayoutTransitionInfoEXT](VkHostImageLayoutTransitionInfo.html)

* 
[VkImageSubresource2EXT](VkImageSubresource2.html)

* 
[VkImageToMemoryCopyEXT](VkImageToMemoryCopy.html)

* 
[VkMemoryToImageCopyEXT](VkMemoryToImageCopy.html)

* 
[VkSubresourceLayout2EXT](VkSubresourceLayout2.html)

* 
Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

[VkHostImageCopyDevicePerformanceQueryEXT](VkHostImageCopyDevicePerformanceQuery.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceHostImageCopyFeaturesEXT](VkPhysicalDeviceHostImageCopyFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceHostImageCopyPropertiesEXT](VkPhysicalDeviceHostImageCopyProperties.html)

Extending [VkSubresourceLayout2](VkSubresourceLayout2.html):

* 
[VkSubresourceHostMemcpySizeEXT](VkSubresourceHostMemcpySize.html)

* 
[VkHostImageCopyFlagBitsEXT](VkHostImageCopyFlagBits.html)

* 
[VkHostImageCopyFlagsEXT](VkHostImageCopyFlags.html)

* 
`VK_EXT_HOST_IMAGE_COPY_EXTENSION_NAME`

* 
`VK_EXT_HOST_IMAGE_COPY_SPEC_VERSION`

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_HOST_IMAGE_TRANSFER_BIT_EXT](VkFormatFeatureFlagBits2.html)

Extending [VkHostImageCopyFlagBits](VkHostImageCopyFlagBits.html):

* 
[VK_HOST_IMAGE_COPY_MEMCPY_BIT_EXT](VkHostImageCopyFlagBits.html)

* 
[VK_HOST_IMAGE_COPY_MEMCPY_EXT](VkHostImageCopyFlagBits.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT_EXT](VkImageUsageFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_TO_IMAGE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_TO_MEMORY_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_MEMORY_TO_IMAGE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_HOST_IMAGE_COPY_DEVICE_PERFORMANCE_QUERY_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_HOST_IMAGE_LAYOUT_TRANSITION_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_TO_MEMORY_COPY_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_TO_IMAGE_COPY_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBRESOURCE_HOST_MEMCPY_SIZE_EXT](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4, with the EXT
suffix omitted.
However, the feature is made optional in Vulkan 1.4.
The original type, enum, and command names are still available as aliases of
the core functionality.

A Vulkan 1.4 implementation that has a [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) queue
must support either:

* 
the [`hostImageCopy`](../../../../spec/latest/chapters/features.html#features-hostImageCopy) feature; or

* 
an additional queue that supports [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html).

Additionally, all queues supporting [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) must also advertise [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html).

1) When uploading data to an image, the data is usually loaded from disk.
Why not have the application load the data directly into a `VkDeviceMemory`
bound to a buffer (instead of host memory), and use
[vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html)? The same could be done when downloading data
from an image.

**RESOLVED**: This may not always be possible.
Complicated Vulkan applications such as game engines often have decoupled
subsystems for streaming data and rendering.
It may be unreasonable to require the streaming subsystem to coordinate with
the rendering subsystem to allocate memory on its behalf, especially as
Vulkan may not be the only API supported by the engine.
In emulation layers, the image data is necessarily provided by the
application in host memory, so an optimization as suggested is not possible.
Most importantly, the device memory may not be mappable by an application,
but still accessible to the driver.

2) Are `optimalBufferCopyOffsetAlignment` and
`optimalBufferCopyRowPitchAlignment` applicable to host memory as well with
the functions introduced by this extension? Or should there be new limits?

**RESOLVED**: No alignment requirements for the host memory pointer.

3) Should there be granularity requirements for image offsets and extents?

**RESOLVED**: No granularity requirements, i.e. a granularity of 1 pixel (for
non-compressed formats) and 1 texel block (for compressed formats) is
assumed.

4) How should the application deal with layout transitions before or after
copying to or from images?

**RESOLVED**: An existing issue with linear images is that when emulating
other APIs, it is impossible to know when to transition them as they are
written to by the host and then used bindlessly.
The copy operations in this extension are affected by the same limitation.
A new command is thus introduced by this extension to address this problem
by allowing the host to perform an image layout transition between a handful
of layouts.

* 
Revision 0, 2021-01-20 (Faith Ekstrand)

Initial idea and xml

Revision 1, 2023-04-26 (Shahbaz Youssefi)

* 
Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_host_image_copy).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
