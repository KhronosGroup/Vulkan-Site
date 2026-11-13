# VK_OHOS_external_memory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_OHOS_external_memory.html

## Table of Contents

- [Name](#_name)
- [VK_OHOS_external_memory](#VK_OHOS_external_memory)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_OHOS_external_memory - device extension

**Name String**

`VK_OHOS_external_memory`

**Extension Type**

Device extension

**Registered Extension Number**

453

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
Weilan Chen [wchen-h](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_OHOS_external_memory] @wchen-h%0A*Here describe the issue or question you have about the VK_OHOS_external_memory extension*)

**Last Modified Date**

2025-11-4

**IP Status**

No known IP claims.

**Contributors**

* 
Weilan Chen, Huawei

* 
Zeihui Lin, Huawei

* 
Bill Hollings, Huawei

* 
Pan Gao, Huawei

* 
Yang Shi, Huawei

This extension enables an application to: import Open Harmony OS
`OH_NativeBuffer` objects created outside of Vulkan device into
Vulkan memory objects, where they can be bound to images and buffers.
It also allows an application to obtain the properties of
`OH_NativeBuffer` object.

* 
`OH_NativeBuffer`

* 
[vkGetMemoryNativeBufferOHOS](vkGetMemoryNativeBufferOHOS.html)

* 
[vkGetNativeBufferPropertiesOHOS](vkGetNativeBufferPropertiesOHOS.html)

* 
[VkMemoryGetNativeBufferInfoOHOS](VkMemoryGetNativeBufferInfoOHOS.html)

* 
[VkNativeBufferPropertiesOHOS](VkNativeBufferPropertiesOHOS.html)

* 
Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html), [VkAttachmentDescription2](VkAttachmentDescription2.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

[VkExternalFormatOHOS](VkExternalFormatOHOS.html)

Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

* 
[VkNativeBufferUsageOHOS](VkNativeBufferUsageOHOS.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkImportNativeBufferInfoOHOS](VkImportNativeBufferInfoOHOS.html)

Extending [VkNativeBufferPropertiesOHOS](VkNativeBufferPropertiesOHOS.html):

* 
[VkNativeBufferFormatPropertiesOHOS](VkNativeBufferFormatPropertiesOHOS.html)

* 
`VK_OHOS_EXTERNAL_MEMORY_EXTENSION_NAME`

* 
`VK_OHOS_EXTERNAL_MEMORY_SPEC_VERSION`

* 
Extending [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html):

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OH_NATIVE_BUFFER_BIT_OHOS](VkExternalMemoryHandleTypeFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_OHOS](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMPORT_NATIVE_BUFFER_INFO_OHOS](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_GET_NATIVE_BUFFER_INFO_OHOS](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_NATIVE_BUFFER_FORMAT_PROPERTIES_OHOS](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_NATIVE_BUFFER_PROPERTIES_OHOS](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_NATIVE_BUFFER_USAGE_OHOS](VkStructureType.html)

* 
Revision 1, 2025-11-4 (Weilan Chen)

Change Extension number to 453, which is donated by ARM.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_OHOS_external_memory).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
