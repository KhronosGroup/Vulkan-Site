# VkDebugUtilsMessengerCallbackDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugUtilsMessengerCallbackDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugUtilsMessengerCallbackDataEXT - Structure specifying parameters returned to the callback

The definition of `VkDebugUtilsMessengerCallbackDataEXT` is:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsMessengerCallbackDataEXT {
    VkStructureType                              sType;
    const void*                                  pNext;
    VkDebugUtilsMessengerCallbackDataFlagsEXT    flags;
    const char*                                  pMessageIdName;
    int32_t                                      messageIdNumber;
    const char*                                  pMessage;
    uint32_t                                     queueLabelCount;
    const VkDebugUtilsLabelEXT*                  pQueueLabels;
    uint32_t                                     cmdBufLabelCount;
    const VkDebugUtilsLabelEXT*                  pCmdBufLabels;
    uint32_t                                     objectCount;
    const VkDebugUtilsObjectNameInfoEXT*         pObjects;
} VkDebugUtilsMessengerCallbackDataEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is `0` and is reserved for future use.

* 
`pMessageIdName` is `NULL` or a null-terminated UTF-8 string that
identifies the particular message ID that is associated with the
provided message.
If the message corresponds to a validation layer message, then this
string will be the VUID.

* 
`messageIdNumber` is the ID number of the triggering message.
If the message corresponds to a validation layer message, then this
number is an internal hash of the VUID.

* 
`pMessage` is
`NULL` if `messageTypes` is equal to
[VK_DEBUG_UTILS_MESSAGE_TYPE_DEVICE_ADDRESS_BINDING_BIT_EXT](VkDebugUtilsMessageTypeFlagBitsEXT.html), or
a null-terminated UTF-8 string detailing the trigger conditions.
If the message corresponds to a validation layer message, then this will
contain the main message with the specification text and link.

* 
`queueLabelCount` is a count of items contained in the
`pQueueLabels` array.

* 
`pQueueLabels` is `NULL` or a pointer to an array of
[VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html) active in the current `VkQueue` at the
time the callback was triggered.
Refer to [Queue Labels](../../../../spec/latest/chapters/debugging.html#debugging-queue-labels) for more information.

* 
`cmdBufLabelCount` is a count of items contained in the
`pCmdBufLabels` array.

* 
`pCmdBufLabels` is `NULL` or a pointer to an array of
[VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html) active in the current `VkCommandBuffer`
at the time the callback was triggered.
Refer to [Command Buffer Labels](../../../../spec/latest/chapters/debugging.html#debugging-command-buffer-labels) for
more information.

* 
`objectCount` is a count of items contained in the `pObjects`
array.

* 
`pObjects` is a pointer to an array of
[VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) objects related to the detected
issue.
The array is roughly in order of importance, but the 0th element is
always guaranteed to be the most important object for this message.

|  | This structure should only be considered valid during the lifetime of the
| --- | --- |
triggered callback. |

Since adding queue and command buffer labels behaves like pushing and
popping onto a stack, the order of both `pQueueLabels` and
`pCmdBufLabels` is based on the order the labels were defined.
The result is that the first label in either `pQueueLabels` or
`pCmdBufLabels` will be the first defined (and therefore the oldest)
while the last label in each list will be the most recent.

|  | `pQueueLabels` will only be non-`NULL` if one of the objects in
| --- | --- |
`pObjects` can be related directly to a defined `VkQueue` which has
had one or more labels associated with it.

Likewise, `pCmdBufLabels` will only be non-`NULL` if one of the objects
in `pObjects` can be related directly to a defined `VkCommandBuffer`
which has had one or more labels associated with it.
Additionally, while command buffer labels allow for beginning and ending
across different command buffers, the debug messaging framework **cannot**
guarantee that labels in `pCmdBufLables` will contain those defined
outside of the associated command buffer.
This is partially due to the fact that the association of one command buffer
with another may not have been defined at the time the debug message is
triggered. |

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-sType-sType) VUID-VkDebugUtilsMessengerCallbackDataEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CALLBACK_DATA_EXT](VkStructureType.html)

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pNext-pNext) VUID-VkDebugUtilsMessengerCallbackDataEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDeviceAddressBindingCallbackDataEXT](VkDeviceAddressBindingCallbackDataEXT.html)

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-sType-unique) VUID-VkDebugUtilsMessengerCallbackDataEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-flags-zerobitmask) VUID-VkDebugUtilsMessengerCallbackDataEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pMessageIdName-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pMessageIdName-parameter

 If `pMessageIdName` is not `NULL`, `pMessageIdName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pMessage-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pMessage-parameter

 If `pMessage` is not `NULL`, `pMessage` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pQueueLabels-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pQueueLabels-parameter

 If `queueLabelCount` is not `0`, `pQueueLabels` **must** be a valid pointer to an array of `queueLabelCount` valid [VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html) structures

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pCmdBufLabels-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pCmdBufLabels-parameter

 If `cmdBufLabelCount` is not `0`, `pCmdBufLabels` **must** be a valid pointer to an array of `cmdBufLabelCount` valid [VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html) structures

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pObjects-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pObjects-parameter

 If `objectCount` is not `0`, `pObjects` **must** be a valid pointer to an array of `objectCount` valid [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structures

[PFN_vkDebugUtilsMessengerCallbackEXT](PFN_vkDebugUtilsMessengerCallbackEXT.html), [VK_EXT_debug_utils](VK_EXT_debug_utils.html), [VkDebugUtilsLabelEXT](VkDebugUtilsLabelEXT.html), [VkDebugUtilsMessengerCallbackDataFlagsEXT](VkDebugUtilsMessengerCallbackDataFlagsEXT.html), [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html), [VkStructureType](VkStructureType.html), [vkSubmitDebugUtilsMessageEXT](vkSubmitDebugUtilsMessageEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugUtilsMessengerCallbackDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
