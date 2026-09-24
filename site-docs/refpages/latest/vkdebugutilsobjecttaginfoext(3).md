# VkDebugUtilsObjectTagInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugUtilsObjectTagInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugUtilsObjectTagInfoEXT - Specify parameters of a tag to attach to an object

The `VkDebugUtilsObjectTagInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsObjectTagInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkObjectType       objectType;
    uint64_t           objectHandle;
    uint64_t           tagName;
    size_t             tagSize;
    const void*        pTag;
} VkDebugUtilsObjectTagInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`objectType` is a [VkObjectType](VkObjectType.html) specifying the type of the
object to be named.

* 
`objectHandle` is the object to be tagged.

* 
`tagName` is a numerical identifier of the tag.

* 
`tagSize` is the number of bytes of data to attach to the object.

* 
`pTag` is a pointer to an array of `tagSize` bytes containing
the data to be associated with the object.

The `tagName` parameter gives a name or identifier to the type of data
being tagged.
This can be used by debugging layers to easily filter for only data that can
be used by that implementation.

Valid Usage

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-objectType-01908) VUID-VkDebugUtilsObjectTagInfoEXT-objectType-01908

`objectType` **must** not be [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html)

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-objectHandle-01910) VUID-VkDebugUtilsObjectTagInfoEXT-objectHandle-01910

`objectHandle` **must** be a valid Vulkan handle of the type associated
with `objectType` as defined in the [    `VkObjectType` and Vulkan Handle Relationship](../../../../spec/latest/chapters/debugging.html#debugging-object-types) table

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-sType-sType) VUID-VkDebugUtilsObjectTagInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_OBJECT_TAG_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-pNext-pNext) VUID-VkDebugUtilsObjectTagInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-objectType-parameter) VUID-VkDebugUtilsObjectTagInfoEXT-objectType-parameter

 `objectType` **must** be a valid [VkObjectType](VkObjectType.html) value

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-pTag-parameter) VUID-VkDebugUtilsObjectTagInfoEXT-pTag-parameter

 `pTag` **must** be a valid pointer to an array of `tagSize` bytes

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-tagSize-arraylength) VUID-VkDebugUtilsObjectTagInfoEXT-tagSize-arraylength

 `tagSize` **must** be greater than `0`

Host Synchronization

* 
Host access to `objectHandle` **must** be externally synchronized

[VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkObjectType](VkObjectType.html), [VkStructureType](VkStructureType.html), [vkSetDebugUtilsObjectTagEXT](vkSetDebugUtilsObjectTagEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugUtilsObjectTagInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
