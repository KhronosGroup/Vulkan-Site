# VkPhysicalDeviceNestedCommandBufferPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceNestedCommandBufferPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceNestedCommandBufferPropertiesEXT - Structure describing the nested command buffer limits of an implementation

The `VkPhysicalDeviceNestedCommandBufferPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_nested_command_buffer
typedef struct VkPhysicalDeviceNestedCommandBufferPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxCommandBufferNestingLevel;
} VkPhysicalDeviceNestedCommandBufferPropertiesEXT;

The members of the `VkPhysicalDeviceNestedCommandBufferPropertiesEXT`
structure describe the following features:

* 

`maxCommandBufferNestingLevel` indicates the maximum nesting level
of calls to [vkCmdExecuteCommands](vkCmdExecuteCommands.html) from [Secondary    Command Buffers](../../../../spec/latest/appendices/glossary.html#glossary).
A `maxCommandBufferNestingLevel` of `UINT32_MAX` means there is
no limit to the nesting level.

If the `VkPhysicalDeviceNestedCommandBufferPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceNestedCommandBufferPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceNestedCommandBufferPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NESTED_COMMAND_BUFFER_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_nested_command_buffer](VK_EXT_nested_command_buffer.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceNestedCommandBufferPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
