# VkDebugUtilsLabelEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugUtilsLabelEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugUtilsLabelEXT - Specify parameters of a label region

The `VkDebugUtilsLabelEXT` structure is defined as:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsLabelEXT {
    VkStructureType    sType;
    const void*        pNext;
    const char*        pLabelName;
    float              color[4];
} VkDebugUtilsLabelEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pLabelName` is a pointer to a null-terminated UTF-8 string
containing the name of the label.

* 
`color` is an optional RGBA color value that can be associated with
the label.
A particular implementation **may** choose to ignore this color value.
The values contain RGBA values in order, in the range 0.0 to 1.0.
If all elements in `color` are 0.0, then it is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsLabelEXT-sType-sType) VUID-VkDebugUtilsLabelEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_LABEL_EXT](VkStructureType.html)

* 
[](#VUID-VkDebugUtilsLabelEXT-pNext-pNext) VUID-VkDebugUtilsLabelEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugUtilsLabelEXT-pLabelName-parameter) VUID-VkDebugUtilsLabelEXT-pLabelName-parameter

 `pLabelName` **must** be a null-terminated UTF-8 string

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html), [VkStructureType](VkStructureType.html), [vkCmdBeginDebugUtilsLabelEXT](vkCmdBeginDebugUtilsLabelEXT.html), [vkCmdInsertDebugUtilsLabelEXT](vkCmdInsertDebugUtilsLabelEXT.html), [vkQueueBeginDebugUtilsLabelEXT](vkQueueBeginDebugUtilsLabelEXT.html), [vkQueueInsertDebugUtilsLabelEXT](vkQueueInsertDebugUtilsLabelEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugUtilsLabelEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
