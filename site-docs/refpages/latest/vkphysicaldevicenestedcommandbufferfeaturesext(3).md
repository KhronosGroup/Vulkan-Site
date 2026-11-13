# VkPhysicalDeviceNestedCommandBufferFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceNestedCommandBufferFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceNestedCommandBufferFeaturesEXT - Structure describing whether nested command buffers are supported by the implementation

The `VkPhysicalDeviceNestedCommandBufferFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_nested_command_buffer
typedef struct VkPhysicalDeviceNestedCommandBufferFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           nestedCommandBuffer;
    VkBool32           nestedCommandBufferRendering;
    VkBool32           nestedCommandBufferSimultaneousUse;
} VkPhysicalDeviceNestedCommandBufferFeaturesEXT;

This structure describes the following features:

* 
 `nestedCommandBuffer` indicates the
implementation supports nested command buffers, which allows [    Secondary Command Buffers](../../../../spec/latest/appendices/glossary.html#glossary) to execute other [Secondary    Command Buffers](../../../../spec/latest/appendices/glossary.html#glossary).

* 

`nestedCommandBufferRendering` indicates that it is valid to call
[vkCmdExecuteCommands](vkCmdExecuteCommands.html) inside a [Secondary Command    Buffer](../../../../spec/latest/appendices/glossary.html#glossary) recorded with
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html).

* 

`nestedCommandBufferSimultaneousUse` indicates that the
implementation supports nested command buffers with command buffers that
are recorded with [VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html).

If the `VkPhysicalDeviceNestedCommandBufferFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceNestedCommandBufferFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceNestedCommandBufferFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceNestedCommandBufferFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NESTED_COMMAND_BUFFER_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_nested_command_buffer](VK_EXT_nested_command_buffer.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceNestedCommandBufferFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
