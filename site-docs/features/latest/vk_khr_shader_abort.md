# VK_KHR_shader_abort

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_shader_abort.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. SPIR-V changes](#_spir_v_changes)
- [3.1._SPIR-V_changes](#_spir_v_changes)
- [3.2. API Changes](#_api_changes)
- [3.2._API_Changes](#_api_changes)
- [3.2.1. Features](#_features)
- [3.2.2. Properties](#_properties)
- [3.2.3. Message Retrieval via VK_KHR_device_fault](#_message_retrieval_via_vk_khr_device_fault)
- [3.2.3._Message_Retrieval_via_VK_KHR_device_fault](#_message_retrieval_via_vk_khr_device_fault)
- [3.2.4. Interactions with pipeline caching/shader binaries](#_interactions_with_pipeline_cachingshader_binaries)
- [3.2.4._Interactions_with_pipeline_caching/shader_binaries](#_interactions_with_pipeline_cachingshader_binaries)
- [3.3. GLSL changes](#_glsl_changes)
- [3.3._GLSL_changes](#_glsl_changes)
- [4. Examples](#_examples)
- [4.1. Example Abort Message Handling](#_example_abort_message_handling)
- [4.1._Example_Abort_Message_Handling](#_example_abort_message_handling)
- [4.2. Retrieving a message](#_retrieving_a_message)
- [4.2._Retrieving_a_message](#_retrieving_a_message)
- [5. Issues](#_issues)
- [5.1. How are aborts from multiple invocations handled?](#_how_are_aborts_from_multiple_invocations_handled)
- [5.1._How_are_aborts_from_multiple_invocations_handled?](#_how_are_aborts_from_multiple_invocations_handled)
- [5.2. How are multiple abort messages packed?](#_how_are_multiple_abort_messages_packed)
- [5.2._How_are_multiple_abort_messages_packed?](#_how_are_multiple_abort_messages_packed)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. SPIR-V changes](#_spir_v_changes)
[3.2. API Changes](#_api_changes)
[3.3. GLSL changes](#_glsl_changes)

[4. Examples](#_examples)

[4.1. Example Abort Message Handling](#_example_abort_message_handling)
[4.2. Retrieving a message](#_retrieving_a_message)

[5. Issues](#_issues)

[5.1. How are aborts from multiple invocations handled?](#_how_are_aborts_from_multiple_invocations_handled)
[5.2. How are multiple abort messages packed?](#_how_are_multiple_abort_messages_packed)

This extension adds a reliable way to abort from a shader, with message passing when used in combination with [VK_KHR_device_fault](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_device_fault).

Most high level languages support assertions or exceptions in some form, that allow application developers to catch unexpected conditions earlier in development and find them easily during debugging.
As the code running on GPUs becomes increasingly complex as the ecosystem matures, enabling this useful debugging tool is more and more desirable.

A solution here has to fulfill the following requirements:

* 
Immediate abort the shader it is called in, without any further execution

* 
Incorporate a message that can be communicated back through the API

* 
Within finite time, cause termination of all current execution, and triggering device loss in the API

All of this can be encoded into a single SPIR-V operation, with message retrieval performed by [VK_KHR_device_fault](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_device_fault) when available.

A new instruction is added to SPIR-V, aborting the shader and triggering device loss in the API:

| **OpAbortKHR**
| --- | --- | --- | --- |
Ceases all further processing in the invocation that executes it.
Only instructions executed before **OpAbortKHR** will have side effects.
Other invocations in the same **Device** scope instance will also be terminated in finite time, though may reach completion.
*Message Type* is the type of the data to be written.
*Message Type* must be a concrete type.
If the *Shader* capability is declared, *Message Type* must have an explicit layout.
*Message* is data that is passed to the client API after termination.
*Message Type* must *logically match* the type of *Message*, as defined in
**OpCopyLogical**.
This instruction must be the last instruction in a block. | Capability:
**AbortKHR** |
| 3 | 5121 | Message Type | Message |

Execution of `OpAbortKHR` will trigger device loss in the API within finite time, making the data in *Message* available via [vkGetDeviceFaultDebugInfoKHR](https://docs.vulkan.org/spec/latest/chapters/debugging.html#vkGetDeviceFaultDebugInfoKHR) for further analysis.

This instruction is gated behind a new capability:

| **Capability** | **Implicitly Declares** |
| --- | --- | --- |
| 5120 | **AbortKHR** |  |

A single feature is added to the API:

typedef struct VkPhysicalDeviceShaderAbortFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderAbort;
} VkPhysicalDeviceShaderAbortFeaturesKHR;

When `shaderAbort` is enabled, shaders can call `OpAbortKHR` and it will result in device loss within finite time.

A single property is added to the API:

typedef struct VkPhysicalDeviceShaderAbortPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           maxShaderAbortMessageSize;
} VkPhysicalDeviceShaderAbortPropertiesKHR;

`maxShaderAbortMessageSize` indicates the maximum allowed size of a single abort message, and must be at least 65536 bytes.

If [VK_KHR_device_fault](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_device_fault) is supported and enabled, new structures to retrieve shader abort messages can be chained into [VkDeviceFaultDebugInfoKHR](https://docs.vulkan.org/spec/latest/chapters/debugging.html#VkDeviceFaultDebugInfoKHR) are added:

typedef struct VkDeviceFaultShaderAbortMessageInfoKHR {
    VkStructureType     sType;
    void*               pNext;
    uint64_t            messageDataSize;
    void*               pMessageData;
} VkDeviceFaultShaderAbortMessageInfoKHR;

`VkDeviceFaultShaderAbortMessageInfoKHR` can be included in the `pNext` chain of [VkDeviceFaultDebugInfoKHR](https://docs.vulkan.org/spec/latest/chapters/debugging.html#VkDeviceFaultDebugInfoKHR) to retrieve  the total size of message data returned by the implementation and the actual the messages returned by `OpAbortKHR` instructions in shaders.

As an implementation may not terminate all shader invocations immediately, it is possible for multiple invocations to call `OpAbortKHR` and return messages to the API.
As such, `pMessageData` can contain multiple messages in a size / message pair.

The first 8 bytes of `pMessageData` should be interpreted as a 64-bit unsigned integer `length`, indicating how many bytes of data are present in the next message.
The following `length` bytes will then contain the message, in the data format specified by the shader.

If there are still bytes unaccounted for in `pMessageData`, then another pair should be read after that message ends at the next 8-byte aligned address, until no bytes of data in `pMessageData` remain unaccounted for.

|  | Implementations may choose to only handle one shader abort message, in which case the first message received should always be the one reported to the application. |
| --- | --- |

Implementations may consider embedding pointers into shader binaries to handle the message passing requirements of this extension; however - doing so naively may result in unintended side effects.
If those pointers are freshly allocated on each device creation, shader binaries or pipeline cache entries for shaders with abort in them will likely always result in a different binary based purely on the pointer value.
Implementations must either pass such pointers indirectly or allocate a consistent pointer between runs to avoid this.

Add a new `abort` function to GLSL with the following semantics:

void abort(...);

This function will be translated to an OpAbortKHR.
The first argument must always be a null-terminated UTF-8 string literal.
The message string and the variable argument list will be automatically packed into a SPIR-V structure type, laid out using scalar packing, with any string arguments converted to an array of bytes.

For the abort message shown below:

uint testval = 65536;
abortEXT("test: %u", testval);

The following SPIR-V would be generated:

             OpCapability ConstantDataKHR
...
             OpDecorate %string_t UTFEncodedKHR
             OpDecorate %string_t ArrayStride 1
             OpMemberDecorate %message_t 0 Offset 0
             OpMemberDecorate %message_t 1 Offset 12
...
   %char_t = OpTypeInt 8 0
 %uint32_t = OpTypeInt 32 0
   %strlen = OpConstant %uint32_t 9
 %string_t = OpTypeArray %char_t %strlen
   %string = OpConstantDataKHR %string_t "test: %u\0"
%message_t = OpTypeStruct %string_t %uint32_t
...
  %testval = OpConstant %uint32_t 65536
    %abort = OpLabel
  %message = OpCompositeConstruct %message_t %string %testval
             OpAbortKHR %message_t %message

If this abort statement was reported just once, the resulting data in `pMessageData` could be read like this:

uint8* pMessageDataCurrent = (uint8_t*)(pMessageData);
while ((((intptr_t)pMessageData + messageDataSize) - (intptr_t)pMessageDataCurrent) > 0) {

    struct Message {
        uint64_t size;
        uint8* pData;
    } message;

    message.size = *(uint64_t*)pMessageDataCurrent;
    pMessageDataCurrent += 4;

    message.pData = pMessageDataCurrent;
    pMessageDataCurrent += message.size;

    myCustomPrintF(message);
}

Data in one of these messages would be equivalent to:

const char pMessageData[24] = ['0','0','0','0','0','0','0','/16','t','e','s','t',':',' ','%','u','0',?,?,?,'0','/1','0','0'];

Noting the 8 bytes of size, then the string, 3 indeterminate characters used to pad %testval to 4-byte boundaries, and then finally the value of %testval in the last 4 bytes.

Upon detecting a device lost condition for `device`, an application can retrieve any shader abort messages using the following code:

struct Message {
    uint64_t size;
    uint8* pData;
};

VkDeviceFaultShaderAbortMessageInfoKHR abortMessageInfo = {
    .sType           = VK_STRUCTURE_TYPE_DEVICE_FAULT_SHADER_ABORT_MESSAGE_INFO_KHR,
    .pNext           = NULL,
    .messageDataSize = 0,
    .pMessageData     = NULL
};

// Only collecting shader abort messages here - other fault information is ignored
VkDeviceFaultDebugInfoKHR debugInfo = {
    .sType           = VK_STRUCTURE_TYPE_DEVICE_FAULT_DEBUG_INFO_KHR
    .pNext           = &abortMessageInfo, // VkDeviceFaultShaderAbortMessageInfoKHR extends VkDeviceFaultDebugInfoKHR
    .vendorBinarySize = 0,
    .pVendorBinary    = NULL
};

if ((vkGetDeviceFaultDebugInfoKHR(device, &debugInfo) == VK_SUCCESS) && (abortMessageInfo.messageDataSize)) {
    // There is a shader abort message payload available - allocate space & retrieve it
    abortMessageInfo.pMessageData  = malloc(abortMessageInfo.messageDataSize);
    vkGetDeviceFaultDebugInfoKHR(device, &debugInfo);

    // Loop over each message in the output
    uint8* pMessageDataCurrent = (uint8_t*)(pMessageData);
    while ((((intptr_t)pMessageData + messageDataSize) - (intptr_t)pMessageDataCurrent) > 0) {
        Message message;

        // Get the size of the next message
        message.size = *(uint64_t*)pMessageDataCurrent;
        pMessageDataCurrent += 4;

        // Get a pointer to the message data
        message.pData = pMessageDataCurrent;
        pMessageDataCurrent += message.size;

        myCustomPrint(message);

        // Align the pointer to 8 bytes for the next message
        uintptr_t aligned = (uintptr_t)pMessageDataCurrent;
        if (aligned % 8 !=0)
            aligned = (aligned % 8) + 8;
        pMessageDataCurrent = (uint8_t*)aligned;
    }

    free(abortMessageInfo.pMessageData);
}

Implementations may continue executing other invocations after an abort is
triggered, potentially resulting in other aborts being executed as well.
It is implementation-defined whether messages for these additional aborts are
also recorded.

Abort messages are packed into the output of `pMessageData` as a sequence of size + payload pairs, with each pair starting at the next 8-byte aligned address after the prior payload.
