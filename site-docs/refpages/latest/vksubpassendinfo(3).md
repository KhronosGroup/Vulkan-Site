# VkSubpassEndInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassEndInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassEndInfo - Structure specifying subpass end information

The `VkSubpassEndInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkSubpassEndInfo {
    VkStructureType    sType;
    const void*        pNext;
} VkSubpassEndInfo;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkSubpassEndInfo
typedef VkSubpassEndInfo VkSubpassEndInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassEndInfo-sType-sType) VUID-VkSubpassEndInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_END_INFO](VkStructureType.html)

* 
[](#VUID-VkSubpassEndInfo-pNext-pNext) VUID-VkSubpassEndInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkRenderPassFragmentDensityMapOffsetEndInfoEXT](VkRenderPassFragmentDensityMapOffsetEndInfoEXT.html)

* 
[](#VUID-VkSubpassEndInfo-sType-unique) VUID-VkSubpassEndInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkStructureType](VkStructureType.html), [vkCmdEndRenderPass2](vkCmdEndRenderPass2.html), [vkCmdEndRenderPass2](vkCmdEndRenderPass2.html), [vkCmdNextSubpass2](vkCmdNextSubpass2.html), [vkCmdNextSubpass2](vkCmdNextSubpass2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkSubpassEndInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
