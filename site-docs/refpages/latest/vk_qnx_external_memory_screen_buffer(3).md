# VK_QNX_external_memory_screen_buffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QNX_external_memory_screen_buffer.html

## Table of Contents

- [Name](#_name)
- [VK_QNX_external_memory_screen_buffer](#VK_QNX_external_memory_screen_buffer)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QNX_external_memory_screen_buffer - device extension

**Name String**

`VK_QNX_external_memory_screen_buffer`

**Extension Type**

Device extension

**Registered Extension Number**

530

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

         [VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)

         and

         [VK_KHR_external_memory](VK_KHR_external_memory.html)

         and

         [VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html)

**Contact**

* 
Mike Gorchak [mgorchak-blackberry](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QNX_external_memory_screen_buffer] @mgorchak-blackberry%0A*Here describe the issue or question you have about the VK_QNX_external_memory_screen_buffer extension*)

* 
Aaron Ruby [aruby-blackberry](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QNX_external_memory_screen_buffer] @aruby-blackberry%0A*Here describe the issue or question you have about the VK_QNX_external_memory_screen_buffer extension*)

**Last Modified Date**

2023-05-17

**IP Status**

No known IP claims.

**Contributors**

* 
Mike Gorchak, QNX / Blackberry Limited

* 
Aaron Ruby, QNX / Blackberry Limited

This extension enables an application to import QNX Screen
`_screen_buffer` objects created outside of the Vulkan device into Vulkan
memory objects, where they can be bound to images and buffers.

Some `_screen_buffer` images have implementation-defined *external
formats* that **may** not correspond to Vulkan formats.
Sampler Y′CBCR conversion **can** be used to sample from these images and
convert them to a known color space.

`_screen_buffer` is strongly typed, so naming the handle type is
redundant.
The internal layout and therefore size of a `_screen_buffer` image may
depend on native usage flags that do not have corresponding Vulkan
counterparts.

* 
[vkGetScreenBufferPropertiesQNX](vkGetScreenBufferPropertiesQNX.html)

* 
[VkScreenBufferPropertiesQNX](VkScreenBufferPropertiesQNX.html)

* 
Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html):

[VkExternalFormatQNX](VkExternalFormatQNX.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkImportScreenBufferInfoQNX](VkImportScreenBufferInfoQNX.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX](VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX.html)

Extending [VkScreenBufferPropertiesQNX](VkScreenBufferPropertiesQNX.html):

* 
[VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html)

* 
`VK_QNX_EXTERNAL_MEMORY_SCREEN_BUFFER_EXTENSION_NAME`

* 
`VK_QNX_EXTERNAL_MEMORY_SCREEN_BUFFER_SPEC_VERSION`

* 
Extending [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html):

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](VkExternalMemoryHandleTypeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_QNX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_SCREEN_BUFFER_INFO_QNX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_SCREEN_BUFFER_FEATURES_QNX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SCREEN_BUFFER_FORMAT_PROPERTIES_QNX](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SCREEN_BUFFER_PROPERTIES_QNX](VkStructureType.html)

* 
Revision 1, 2023-05-17 (Mike Gorchak)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QNX_external_memory_screen_buffer).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
