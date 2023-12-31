import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { probationValidationSchema } from 'validationSchema/probations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.probation
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getProbationById();
    case 'PUT':
      return updateProbationById();
    case 'DELETE':
      return deleteProbationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProbationById() {
    const data = await prisma.probation.findFirst(convertQueryToPrismaUtil(req.query, 'probation'));
    return res.status(200).json(data);
  }

  async function updateProbationById() {
    await probationValidationSchema.validate(req.body);
    const data = await prisma.probation.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteProbationById() {
    const data = await prisma.probation.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
