# VK_KHR_shader_relaxed_extended_instruction

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_shader_relaxed_extended_instruction.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)
- [3.2. SPV_KHR_relaxed_extended_instruction](#_spv_khr_relaxed_extended_instruction)
- [3.2._SPV_KHR_relaxed_extended_instruction](#_spv_khr_relaxed_extended_instruction)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)
[3.2. SPV_KHR_relaxed_extended_instruction](#_spv_khr_relaxed_extended_instruction)

SPIR-V has what we call non-semantic instructions. Those instructions add
additional, but optional information. If the consumer does not know about
those specific instructions, they can simply be removed without altering
the shader behavior.
One usage for such instructions are debug information.

The SPIR-V specification allows forward references in a few specific
locations (OpPhi, OpTypeForwardPointer). NonSemantic instructions are not
one of them.
However, the NonSemantic.Shader.DebugInfo.100 spec allows forward references
in a few cases.
When generating debug information for a class method, a cycle appears in
the debug instruction definitions:
 - the class needs the ID of the method.
 - the method needs the ID of the class.
For this reason, it should be allowed to have forward references in some
debug instructions, hence non-semantic instructions.

More context:
[https://github.com/KhronosGroup/SPIRV-Registry/issues/203](https://github.com/KhronosGroup/SPIRV-Registry/issues/203)

The solution to this problem shall allow the usage of forward references
on non-semantic instruction when required.

Because non-semantic instruction can, to some extent, be processed by
tools for which the extended instruction set is unknown, we shall define
a generic way to warn the tool that this instruction has forward references.

However, to remain close to the initial non-semantic specification philosophy,
we should limit the impact of this relaxation.

The following feature is exposed by this extension:

typedef struct VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderRelaxedExtendedInstruction;
} VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR;

If `shaderRelaxedExtendedInstruction` is set, the device supports
shaders using the SPIR-V extension SPV_KHR_relaxed_extended_instruction.

This extensions relaxes slightly the non-semantic specification, while
adding a new opcode: `OpExtInstWithForwardRefsKHR`.
This new opcode allows — in limited cases — forward references.
